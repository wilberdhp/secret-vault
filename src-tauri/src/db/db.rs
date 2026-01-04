use argon2::{
  Argon2,
  password_hash::{PasswordHasher, SaltString},
};

use hex;
use rand::rngs::OsRng;
use secrecy::{ExposeSecret, SecretString};
use sqlx::{SqlitePool, sqlite::SqlitePoolOptions};
use tauri::Manager;
use std::{fs, path::PathBuf};
use zeroize::Zeroize;

/// Derivar la clave
fn derive_key(master_password: &SecretString, salt: &SaltString) -> Vec<u8> {
  let argon2 = Argon2::default();
  let hash = argon2
      .hash_password(master_password.expose_secret().as_bytes(), salt)
      .expect("Error derivando clave");

  hash.hash.unwrap().as_bytes().to_vec()
}

/// Iniciar la conexión con la base de datos
pub async fn init_db(app: &tauri::AppHandle, master_password: SecretString) -> SqlitePool {
  // Resolver %APPDATA%
  let appdata = app.path()
    .app_data_dir()
    .expect("No se pudo resolver app_data_dir");
    
  let db_dir = PathBuf::from(appdata).join("Secret Vault").join("database");
  fs::create_dir_all(&db_dir).expect("No se pudo crear el directorio");

  // Ruta de base de datos y salt
  let db_path = db_dir.join("Database.db");
  let salt_path = db_dir.join("salt.bin");

  // Crear la DB si no existe
  if !db_path.exists() {
    fs::File::create(&db_path).expect("No se pudo crear el archivo de base de datos");
  }

  // Crear/leer salt para derivar clave
  let salt: SaltString = if salt_path.exists() {
    let b64 = fs::read_to_string(&salt_path).expect("No se pudo leer el salt");
    SaltString::from_b64(&b64).expect("Salt inválido")
  } else {
    let salt = SaltString::generate(&mut OsRng);
    fs::write(&salt_path, salt.as_str()).expect("No se pudo guardar el salt");
    salt
  };

  let mut key_bytes = derive_key(&master_password, &salt);
  let key_hex = hex::encode(&key_bytes);

  #[cfg(debug_assertions)]
  println!("SQLCipher key (DEBUG): {}", key_hex);

  let database_url = format!("sqlite://{}", db_path.display());

  #[cfg(debug_assertions)]
  println!("DataBase URL (DEBUG): {}", database_url);

  // Conectar
  let pool = SqlitePoolOptions::new()
      .max_connections(1)
      .connect(&database_url)
      .await
      .expect("Clave incorrecta");

  // Aplicar clave SQLCipher
  sqlx::query(&format!("PRAGMA key = \"x'{}'\";", key_hex))
    .execute(&pool)
    .await
    .expect("Clave incorrecta");

  // PRAGMAs de conexión
  sqlx::query("PRAGMA cipher_memory_security = ON;")
      .execute(&pool)
      .await
      .unwrap();

  sqlx::query("PRAGMA foreign_keys = ON;")
      .execute(&pool)
      .await
      .unwrap();
  
  // Validar clave
  if sqlx::query("SELECT count(*) FROM sqlite_master;")
      .fetch_one(&pool)
      .await
      .is_err()
  {
    panic!("Contraseña incorrecta");
  }

  // Verificar si la DB ya fue creada
  let user_version: i64 = sqlx::query_scalar("PRAGMA user_version;")
      .fetch_one(&pool)
      .await
      .unwrap();

  if user_version == 0 {
    // PRAGMAs persistentes (solo una vez)
    sqlx::query("PRAGMA journal_mode = WAL;").execute(&pool).await.unwrap();
    sqlx::query("PRAGMA secure_delete = ON;").execute(&pool).await.unwrap();

    sqlx::query(
      r#"
      CREATE TABLE IF NOT EXISTS "Users" (
        "id_user" TEXT NOT NULL UNIQUE,
        "username" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        PRIMARY KEY ("id_user")
      );

      CREATE TABLE IF NOT EXISTS "Passwords" (
        "id_password" TEXT NOT NULL UNIQUE,
        "id_user" TEXT NOT NULL,
        "account" TEXT NOT NULL,
        "username" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        PRIMARY KEY ("id_password"),
        FOREIGN KEY ("id_user") REFERENCES "Users" ("id_user") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "Notes" (
        "id_note" TEXT NOT NULL UNIQUE,
        "id_user" TEXT NOT NULL,
        "date" INTEGER NOT NULL,
        "title" TEXT,
        "content" TEXT,
        PRIMARY KEY ("id_note"),
        FOREIGN KEY ("id_user") REFERENCES "Users" ("id_user") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "Contacts" (
        "id_contact" TEXT NOT NULL UNIQUE,
        "id_user" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        PRIMARY KEY ("id_contact"),
        FOREIGN KEY ("id_user") REFERENCES "Users" ("id_user") ON DELETE CASCADE
      );      

      CREATE TABLE IF NOT EXISTS "Phones" (
        "id_phone" INTEGER NOT NULL,
        "phone" TEXT NOT NULL,
        "id_contact" TEXT NOT NULL,
        PRIMARY KEY ("id_phone" AUTOINCREMENT),
        FOREIGN KEY ("id_contact") REFERENCES "Contacts" ("id_contact") ON DELETE CASCADE
      );    
      "#
    )
    .execute(&pool)
    .await
    .unwrap();

    println!("Tablas creadas");

    sqlx::query("PRAGMA user_version = 1;")
        .execute(&pool)
        .await
        .unwrap();
  }

  key_bytes.zeroize();

  pool

}