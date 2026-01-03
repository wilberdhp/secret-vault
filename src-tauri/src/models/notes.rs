use std::time::{SystemTime, UNIX_EPOCH};
use sqlx::{SqlitePool, Error, FromRow};
use uuid::Uuid;
use serde::Serialize;

#[derive(Debug, Serialize, FromRow)]
pub struct NoteDto {
  pub id: String,
  pub date: i64,
  pub title: String,
  pub content: String,
}

pub async fn get_all(pool: &SqlitePool, id_user: &str) -> Result<Vec<NoteDto>, Error> {
  let rows = sqlx::query_as::<_, NoteDto>(
    r#"
    SELECT
      id_note AS id,
      date,
      title,
      content
    FROM Notes 
    WHERE id_user = ?
    ORDER BY date DESC;
    "#
  )
  .bind(id_user)
  .fetch_all(pool)
  .await?;

  Ok(rows)
}

pub async fn insert(pool: &SqlitePool, id_user: &str, title: &str, content: &str) -> Result<(), Error> {
  
  let id_note = Uuid::new_v4().to_string();

  let date = SystemTime::now();
  let since_to_epoch = date.duration_since(UNIX_EPOCH).expect("Fallo al convertir la fecha a números");
  let timestamp = since_to_epoch.as_millis() as i64;
  
  sqlx::query(
    r#"
    INSERT INTO 
      Notes (id_note, id_user, date, title, content)
      VALUES (?, ?, ?, ?, ?)
    "#
  )
  .bind(id_note)
  .bind(id_user)
  .bind(timestamp)
  .bind(title)
  .bind(content)
  .execute(pool)
  .await?;

  Ok(())
}

pub async fn update(pool: &SqlitePool, id_note: &str, title: &str, content: &str) -> Result<(), Error> {
  
  let date = SystemTime::now();
  let since_to_epoch = date.duration_since(UNIX_EPOCH).expect("Fallo al convertir la fecha a números");
  let timestamp = since_to_epoch.as_millis() as i64;
  
  
  sqlx::query(
    r#"
    UPDATE Notes 
    SET 
      title = ?,
      content = ?,
      date = ?
    WHERE id_note = ?;
    "#
  )
  .bind(title)
  .bind(content)
  .bind(timestamp)
  .bind(id_note)
  .execute(pool)
  .await?;

  Ok(())
}

pub async fn delete(pool: &SqlitePool, id_note: &str) -> Result<(), Error> {
  sqlx::query(
    "DELETE FROM Notes WHERE id_note = ?;"
  )
  .bind(id_note)
  .execute(pool)
  .await?;

  Ok(())
}

pub async fn delete_all(pool: &SqlitePool, id_user: &str) -> Result<(), Error> {
  sqlx::query(
    "DELETE FROM Notes WHERE id_user = ?;"
  )
  .bind(id_user)
  .execute(pool)
  .await?;

  Ok(())
}