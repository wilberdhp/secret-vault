use crate::models::notes::NoteDto;
use std::io::Write;
use time::{OffsetDateTime, format_description};

pub fn write_notes_txt<W: Write>(writer: &mut W, note: &NoteDto) -> std::io::Result<()> {
    
    let datetime = OffsetDateTime::from_unix_timestamp_nanos((note.date as i128) * 1_000_000).unwrap();
    let format = format_description::parse("[year]-[month]-[day]")
        .expect("formato inválido");
    
    let date = datetime.format(&format).unwrap();
    
    writeln!(writer, "Fecha: {}\n", date)?;
    writeln!(writer, "Título: {}", note.title)?;
    writeln!(writer, "\n{}", note.content)?;
    Ok(())
}
