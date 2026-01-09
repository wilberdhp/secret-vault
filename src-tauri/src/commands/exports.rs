use crate::{commands::contacts::ContactDto2, exports::contacts::write_contacts_vcf};
use std::{fs::File, io::BufWriter};


#[tauri::command]
pub fn export_contacts_vcf_file(path: &str, contacts: &[ContactDto2]) -> Result<(), Box<dyn std::error::Error>> {
    let file = File::create(path)?;
    let mut writer = BufWriter::new(file);
    Ok(write_contacts_vcf(&mut writer, contacts)?)
}
