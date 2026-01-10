use crate::{exports::contacts::write_contacts_vcf};
use std::fs::{File, create_dir_all};
use std::io::BufWriter;
use crate::models::notes::NoteDto;
use crate::exports::notes::write_notes_txt;
use crate::models::passwords::PasswordDto;
use crate::exports::passwords::write_passwords_csv;
use crate::models::users as us;

const INVALID_CREDENTIALS: &str = "Credenciales inválidas";

use crate::security;
use crate::state::AppState;
use argon2::PasswordVerifier;
use argon2::password_hash::PasswordHash;

async fn verify_user_credentials(state: tauri::State<'_, AppState>, id_user: &str, password: &str) -> Result<(), Box<dyn std::error::Error>> {
    let account_password = us::find_user_to_verification_password(state.pool(), &id_user)
        .await
        .map_err(|_| INVALID_CREDENTIALS.to_string())?;

    let parsed_hash = PasswordHash::new(&account_password)
        .map_err(|_| INVALID_CREDENTIALS.to_string())?;

    let argon2 = security::password::argon2_config();

    argon2
        .verify_password(password.as_bytes(), &parsed_hash)
        .map_err(|_| INVALID_CREDENTIALS.to_string())?;

    Ok(())
}

#[tauri::command]
pub async fn export_contacts_vcf_file(state: tauri::State<'_, AppState>, path: &str, id_user: &str, password: &str) -> Result<(), String> {
    
    use crate::models::contacts::get_all;

    verify_user_credentials(state.clone(), id_user, password)
        .await
        .map_err(|_| INVALID_CREDENTIALS.to_string())?;

    let contacts = get_all(&state.pool(), id_user)
        .await
        .map_err(|_| "Error al exportar los contactos".to_string())?;
    
    let file = File::create(path).map_err(|_| "Error interno del sistema".to_string())?;
    let mut writer = BufWriter::new(file);

    write_contacts_vcf(&mut writer, contacts).map_err(|_| "Error interno del sistema".to_string())?;

    Ok(())
}

#[tauri::command]
pub async fn export_notes_txt_files(state: tauri::State<'_, AppState>, path: &str, id_user: &str, password: &str) -> Result<(), String> {
    
    verify_user_credentials(state.clone(), id_user, password)
        .await
        .map_err(|_| INVALID_CREDENTIALS.to_string())?;

    use crate::models::notes::get_all;

    let notes = get_all(&state.pool(), id_user)
        .await
        .map_err(|_| "Error al exportar las notas".to_string())?;

    for (i, note) in notes.iter().enumerate() {
        let path = format!("{}/note_{}_{}.txt", path, i + 1, &note.title);
        let file = File::create(path).map_err(|_| "Error interno del sistema al intentar exportar las notas".to_string())?;
        let mut writer = BufWriter::new(file);
        write_notes_txt(&mut writer, note).map_err(|_| "Error interno del sistema al intentar exportar las notas".to_string())?;
    }

    Ok(())
}

#[tauri::command]
pub fn export_passwords_csv_file(path: &str, passwords: &[PasswordDto]) -> Result<(), Box<dyn std::error::Error>> {
    let file = File::create(path)?;
    let writer = BufWriter::new(file);
    write_passwords_csv(writer, passwords)
}
