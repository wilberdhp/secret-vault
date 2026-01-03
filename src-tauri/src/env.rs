use secrecy::SecretString;
use dotenvy::dotenv;
use std::env;

pub fn get_master_password() -> SecretString {
    // Cargar variables .env
    dotenv().ok();

    // Leer la variable de entorno
    let pw = env::var("MASTER_PASSWORD")
        .expect("La variable MASTER_PASSWORD no está definida");

    // Convertir en SecretString
    SecretString::new(pw)
}