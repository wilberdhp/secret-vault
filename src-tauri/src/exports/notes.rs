use crate::models::notes::NoteDto;
use std::{io::Write};

pub fn write_txt<W: Write>(
    writer: &mut W,
    note: &NoteDto,
) -> std::io::Result<()> {
    writeln!(writer, "Fecha: {}\n", note.date)?;
    writeln!(writer, "Título: {}", note.title)?;
    writeln!(writer, "\n{}", note.content)?;
    Ok(())
}
