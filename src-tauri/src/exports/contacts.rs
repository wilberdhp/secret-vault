use serde::Serialize;

use crate::commands::contacts::ContactDto2;
use std::{io::Write};

#[derive(Serialize)]
struct CsvContact {
  name: String,
  email: String,
  phones: String,
}

pub fn write_csv<W: Write>(
    writer: W,
    contacts: &[ContactDto2],
) -> Result<(), Box<dyn std::error::Error>> {
    let mut wtr = csv::Writer::from_writer(writer);

    for c in contacts {
        wtr.serialize(CsvContact {
            name: c.name.clone(),
            phones: c.phones.join(" | "),
            email: c.email.clone(),
        })?;
    }

    wtr.flush()?;
    Ok(())
}
