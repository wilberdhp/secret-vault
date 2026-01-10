use serde::Serialize;

use crate::models::contacts::ContactDto;
use std::{io::Write};

#[derive(Serialize)]
struct CsvContact {
  name: String,
  email: String,
  phones: String,
}

pub fn write_contacts_vcf<W: Write>(
    writer: &mut W,
    contacts: Vec<ContactDto>,
) -> std::io::Result<()> {
    for c in contacts {
        writeln!(writer, "BEGIN:VCARD")?;
        writeln!(writer, "VERSION:3.0")?;
        writeln!(writer, "FN:{}", &c.name)?;

        for phone in &c.phones {
            writeln!(writer, "TEL;TYPE=CELL:{}", phone)?;
        }

        if !c.email.is_empty() {
            writeln!(writer, "EMAIL:{}", &c.email)?;
        }

        writeln!(writer, "END:VCARD")?;
    }
    Ok(())
}