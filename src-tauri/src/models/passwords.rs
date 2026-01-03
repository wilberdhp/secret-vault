use sqlx::{SqlitePool, Error, FromRow};
use uuid::Uuid;
use serde::Serialize;

#[derive(Debug, Serialize, FromRow)]
pub struct PasswordDto {
    pub id: String,
    pub account: String,
    pub username: String,
    pub password: String,
}

pub async fn get_all(
    pool: &SqlitePool,
    id_user: &str,
) -> Result<Vec<PasswordDto>, Error> {
    let rows = sqlx::query_as::<_, PasswordDto>(
        r#"
        SELECT
            id_password AS id,
            account,
            username,
            password
        FROM Passwords
        WHERE id_user = ?;
        "#
    )
    .bind(id_user)
    .fetch_all(pool)
    .await?;

    Ok(rows)
}


pub async fn insert(pool: &SqlitePool, id_user: &str, account: &str, username: &str, password: &str) -> Result<(), Error> {
  
  let id_password = Uuid::new_v4().to_string();
  
  sqlx::query(
    r#"
    INSERT INTO 
      Passwords (id_password, id_user, account, username, password)
      VALUES (?, ?, ?, ?, ?)
    "#
  )
  .bind(id_password)
  .bind(id_user)
  .bind(account)
  .bind(username)
  .bind(password)
  .execute(pool)
  .await?;

  Ok(())
}

pub async fn update(pool: &SqlitePool, id_password: &str, account: &str, username: &str, password: &str) -> Result<(), Error> {
  sqlx::query(
    r#"
    UPDATE Passwords 
    SET 
      account = ?,
      username = ?,
      password = ?
    WHERE id_password = ?;
    "#
  )
  .bind(account)
  .bind(username)
  .bind(password)
  .bind(id_password)
  .execute(pool)
  .await?;

  Ok(())
}

pub async fn delete(pool: &SqlitePool, id_password: &str) -> Result<(), Error> {
  sqlx::query(
    "DELETE FROM Passwords WHERE id_password = ?;"
  )
  .bind(id_password)
  .execute(pool)
  .await?;

  Ok(())
}

pub async fn delete_all(pool: &SqlitePool, id_user: &str) -> Result<(), Error> {
  sqlx::query(
    "DELETE FROM Passwords WHERE id_user = ?;"
  )
  .bind(id_user)
  .execute(pool)
  .await?;

  Ok(())
}