use crate::{commands::contacts::ContactDto2, exports::contacts::write_csv};
use std::{fs::File, io::BufWriter};

#[tauri::command]
pub fn export_csv_file(path: &str, contacts: &[ContactDto2]) -> Result<(), Box<dyn std::error::Error>> {
    let file = File::create(path)?;
    let writer = BufWriter::new(file);
    write_csv(writer, contacts)
}