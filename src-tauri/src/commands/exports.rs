use crate::exports::contacts::write_contacts_vcf;
use crate::exports::notes::write_notes_txt;
use crate::exports::passwords::write_passwords_csv;
use crate::models::users as us;
use std::fs::{create_dir_all, File};
use std::io::BufWriter;
use zip::{write::SimpleFileOptions, ZipWriter};

const INVALID_CREDENTIALS: &str = "Credenciales inválidas";

use crate::security;
use crate::state::AppState;
use argon2::password_hash::PasswordHash;
use argon2::PasswordVerifier;

async fn verify_user_credentials(
    state: tauri::State<'_, AppState>,
    id_user: &str,
    password: &str,
) -> Result<(), Box<dyn std::error::Error>> {
    let account_password = us::find_user_to_verification_password(state.pool(), &id_user)
        .await
        .map_err(|_| INVALID_CREDENTIALS.to_string())?;

    let parsed_hash =
        PasswordHash::new(&account_password).map_err(|_| INVALID_CREDENTIALS.to_string())?;

    let argon2 = security::password::argon2_config();

    argon2
        .verify_password(password.as_bytes(), &parsed_hash)
        .map_err(|_| INVALID_CREDENTIALS.to_string())?;

    Ok(())
}

#[tauri::command]
pub async fn export_contacts(
    state: tauri::State<'_, AppState>,
    path: &str,
    id_user: &str,
    password: &str,
) -> Result<(), String> {
    use crate::models::contacts::get_all;

    verify_user_credentials(state.clone(), id_user, password)
        .await
        .map_err(|_| INVALID_CREDENTIALS.to_string())?;

    let contacts = get_all(&state.pool(), id_user)
        .await
        .map_err(|_| "Error al exportar los contactos".to_string())?;

    let file = File::create(path).map_err(|_| "Error interno del sistema".to_string())?;
    let mut writer = BufWriter::new(file);

    write_contacts_vcf(&mut writer, contacts)
        .map_err(|_| "Error interno del sistema".to_string())?;

    Ok(())
}

#[tauri::command]
pub async fn export_notes(
    state: tauri::State<'_, AppState>,
    path: &str,
    id_user: &str,
    password: &str,
) -> Result<(), String> {
    const ERROR_MESSAGE: &str = "Error interno del sistema al intentar exportar las notas";

    verify_user_credentials(state.clone(), id_user, password)
        .await
        .map_err(|_| INVALID_CREDENTIALS.to_string())?;

    create_dir_all(path).map_err(|_| ERROR_MESSAGE.to_string())?;

    use crate::models::notes::get_all;

    let notes = get_all(&state.pool(), id_user)
        .await
        .map_err(|_| ERROR_MESSAGE.to_string())?;

    for (i, note) in notes.iter().enumerate() {
        let path = format!("{}/note_{}_{}.txt", path, i + 1, &note.title);
        let file = File::create(path).map_err(|_| ERROR_MESSAGE.to_string())?;
        let mut writer = BufWriter::new(file);
        write_notes_txt(&mut writer, note).map_err(|_| ERROR_MESSAGE.to_string())?;
    }

    Ok(())
}

#[tauri::command]
pub async fn export_passwords(
    state: tauri::State<'_, AppState>,
    path: &str,
    id_user: &str,
    password: &str,
) -> Result<(), String> {
    const ERROR_MESSAGE: &str = "Error interno del sistema al intentar exportar las contraseñas";

    verify_user_credentials(state.clone(), id_user, password)
        .await
        .map_err(|_| INVALID_CREDENTIALS.to_string())?;

    use crate::models::passwords::get_all;

    let vec_passwords = get_all(&state.pool(), id_user)
        .await
        .map_err(|_| "Error al solicitar los datos en la bd".to_string())?;

    let file = File::create(path).map_err(|_| ERROR_MESSAGE.to_string())?;
    let writer = BufWriter::new(file);
    write_passwords_csv(writer, vec_passwords).map_err(|_| "Error al escribir el archivo CSV".to_string())?;

    Ok(())
}

#[tauri::command]
pub async fn export_zip(
    state: tauri::State<'_, AppState>,
    path: &str,
    id_user: &str,
    password: &str,
) -> Result<(), String> {
    const ERROR_MESSAGE: &str = "Error interno del sistema al intentar exportar los datos";

    verify_user_credentials(state.clone(), id_user, password)
        .await
        .map_err(|_| INVALID_CREDENTIALS.to_string())?;

    let file = File::create(path).map_err(|_| ERROR_MESSAGE.to_string())?;
    let mut zip = ZipWriter::new(file);

    let options = SimpleFileOptions::default()
        .compression_method(zip::CompressionMethod::Deflated)
        .unix_permissions(0o755);

    // Passwords CSV
    let passwords = crate::models::passwords::get_all(&state.pool(), id_user)
        .await
        .map_err(|_| ERROR_MESSAGE.to_string())?;
    zip.start_file("passwords.csv", options.clone())
        .map_err(|_| ERROR_MESSAGE.to_string())?;
    write_passwords_csv(&mut zip, passwords).map_err(|_| ERROR_MESSAGE.to_string())?;

    // Contacts VCF
    let contacts = crate::models::contacts::get_all(&state.pool(), id_user)
        .await
        .map_err(|_| ERROR_MESSAGE.to_string())?;

    zip.start_file("contacts.vcf", options.clone())
        .map_err(|_| ERROR_MESSAGE.to_string())?;
    write_contacts_vcf(&mut zip, contacts).map_err(|_| ERROR_MESSAGE.to_string())?;

    // Notes TXT
    let notes = crate::models::notes::get_all(&state.pool(), id_user)
        .await
        .map_err(|_| ERROR_MESSAGE.to_string())?;

    for (i, note) in notes.iter().enumerate() {
        let name = format!("notes/note_{}_{}.txt", i + 1, &note.title);
        zip.start_file(name, options.clone())
            .map_err(|_| ERROR_MESSAGE.to_string())?;
        write_notes_txt(&mut zip, note).map_err(|_| ERROR_MESSAGE.to_string())?;
    }

    zip.finish().map_err(|_| ERROR_MESSAGE.to_string())?;
    Ok(())
}
