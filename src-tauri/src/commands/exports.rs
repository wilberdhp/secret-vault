use crate::{commands::contacts::ContactDto2, exports::contacts::write_contacts_vcf};
use std::fs::{File, create_dir_all};
use std::io::BufWriter;
use crate::models::notes::NoteDto;
use crate::exports::notes::write_notes_txt;
use crate::models::passwords::PasswordDto;
use crate::exports::passwords::write_passwords_csv;


#[tauri::command]
pub fn export_contacts_vcf_file(path: &str, contacts: &[ContactDto2]) -> Result<(), Box<dyn std::error::Error>> {
    let file = File::create(path)?;
    let mut writer = BufWriter::new(file);
    Ok(write_contacts_vcf(&mut writer, contacts)?)
}

#[tauri::command]
pub fn export_notes_txt_files(dir: &str, notes: &[NoteDto]) -> std::io::Result<()> {
    create_dir_all(dir)?;

    for (i, note) in notes.iter().enumerate() {
        let path = format!("{}/note_{}_{}.txt", dir, i + 1, &note.title);
        let file = File::create(path)?;
        let mut writer = BufWriter::new(file);
        write_notes_txt(&mut writer, note)?;
    }

    Ok(())
}

#[tauri::command]
pub fn export_passwords_csv_file(path: &str, passwords: &[PasswordDto]) -> Result<(), Box<dyn std::error::Error>> {
    let file = File::create(path)?;
    let writer = BufWriter::new(file);
    write_passwords_csv(writer, passwords)
}
