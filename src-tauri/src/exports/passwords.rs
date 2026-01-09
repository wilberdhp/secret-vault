use std::{io::Write};
use serde::Serialize;

use crate::models::passwords::PasswordDto;

#[derive(Serialize)]
struct CsvPassword {
  account: String,
  username: String,
  password: String,
}

pub fn write_passwords_csv<W: Write>(
    writer: W,
    passwords: &[PasswordDto],
) -> Result<(), Box<dyn std::error::Error>> {
    let mut wtr = csv::Writer::from_writer(writer);

    for p in passwords {
        wtr.serialize(CsvPassword {
            account: p.account.clone(),
            username: p.username.clone(),
            password: p.password.clone(),
        })?;
    }

    wtr.flush()?;
    Ok(())
}
