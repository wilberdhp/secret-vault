use sqlx::SqlitePool;

pub async fn insert_phone(pool: &SqlitePool, id_contact: &str, phone: &str) {
    
  sqlx::query(
    r#"
    INSERT INTO 
      Phones (id_contact, phone)
      VALUES (?, ?)
    "#
  )
  .bind(id_contact)
  .bind(phone)
  .execute(pool)
  .await
  .expect("Error al insertar un teléfono");
}

pub async fn delete_phone(pool: &SqlitePool, id_contact: &str) {
  sqlx::query(
    "DELETE FROM Phones WHERE id_contact = ?;"
  )
  .bind(id_contact)
  .execute(pool)
  .await
  .expect("Error al eliminar los teléfonos");
}