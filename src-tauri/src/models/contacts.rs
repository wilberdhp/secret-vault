use sqlx::{SqlitePool, Error, FromRow};
use uuid::Uuid;
use serde::Serialize;
use std::collections::HashMap;

#[derive(Debug, Serialize, FromRow)]
pub struct Contacts {
  pub id: String,
  pub name: String,
  pub email: String,
  pub phone: String
}

#[derive(Debug, Serialize, FromRow)]
pub struct ContactDto {
    pub id: String,
    pub name: String,
    pub email: String,
    pub phones: Vec<String>,
}

pub async fn get_all(pool: &SqlitePool, id_user: &str) -> Result<Vec<ContactDto>, Error> {
  let rows = sqlx::query_as::<_, Contacts>(
    r#"
    SELECT
      c.id_contact AS id,
      c.name,
      c.email,
      ph.phone
    FROM Contacts c
    JOIN Phones ph ON c.id_contact = ph.id_contact 
    WHERE id_user = ?;
    "#
  )
  .bind(id_user)
  .fetch_all(pool)
  .await?;

  let mut map: HashMap<String, ContactDto> = HashMap::new();

    for row in rows {
        map.entry(row.id.clone())
            .and_modify(|contact| contact.phones.push(row.phone.clone()))
            .or_insert(ContactDto {
                id: row.id,
                name: row.name,
                email: row.email,
                phones: vec![row.phone],
            });
    }

  Ok(map.into_values().collect())
}

pub async fn insert(pool: &SqlitePool, id_user: &str, name: &str, email: &str, phones: Vec<&str>) -> Result<(), Error> {
  
  let id_contact = Uuid::new_v4().to_string();
  
  sqlx::query(
    r#"
    INSERT INTO 
      Contacts (id_contact, id_user, name, email)
      VALUES (?, ?, ?, ?)
    "#
  )
  .bind(&id_contact)
  .bind(id_user)
  .bind(name)
  .bind(email)
  .execute(pool)
  .await?;

  use crate::models::phones::insert_phone;

  for phone in phones {
    insert_phone(pool, &id_contact, phone).await;
  }

  Ok(())
}

pub async fn update(pool: &SqlitePool, id_contact: &str, name: &str, email: &str, phones: Vec<&str>) -> Result<(), Error> {
  sqlx::query(
    r#"
    UPDATE Contacts 
    SET 
      name = ?,
      email = ?
    WHERE id_contact = ?;
    "#
  )
  .bind(name)
  .bind(email)
  .bind(id_contact)
  .execute(pool)
  .await?;

  use crate::models::phones::insert_phone;
  use crate::models::phones::delete_phone;

  delete_phone(pool, id_contact).await;

  for phone in phones {
    insert_phone(pool, id_contact, phone).await;
  }

  Ok(())
}

pub async fn delete(pool: &SqlitePool, id_contact: &str) -> Result<(), Error> {
  sqlx::query(
    "DELETE FROM Contacts WHERE id_contact = ?;"
  )
  .bind(id_contact)
  .execute(pool)
  .await?;

  Ok(())
}

pub async fn delete_all(pool: &SqlitePool, id_user: &str) -> Result<(), Error> {
  sqlx::query(
    "DELETE FROM Contacts WHERE id_user = ?;"
  )
  .bind(id_user)
  .execute(pool)
  .await?;

  Ok(())
}