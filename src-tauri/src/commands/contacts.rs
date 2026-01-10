use crate::state::AppState;
use crate::models::contacts::{self  as ct, ContactDto};



#[tauri::command]
pub async fn get_all_contacts(
    state: tauri::State<'_, AppState>,
    id_user: String,
) -> Result<Vec<ContactDto>, String> {

    let id_user = id_user.trim();

    if id_user.is_empty() {
        return Err("Usuario inválido.".to_string());
    }

    let rows = ct::get_all(&state.pool(), id_user)
        .await
        .map_err(|_| {
            "No se pudieron obtener los contactos. Intente nuevamente más tarde."
                .to_string()
        })?;

    Ok(rows)
}

#[tauri::command]
pub async fn insert_contact(
    state: tauri::State<'_, AppState>,
    id_user: String,
    name: String,
    email: String,
    phones: Vec<String>,
) -> Result<(), String> {

    let id_user = id_user.trim();
    let name = name.trim();
    let email = email.trim();

    if id_user.is_empty() {
        return Err("Usuario inválido.".to_string());
    }

    if name.is_empty() {
        return Err("El nombre del contacto es obligatorio.".to_string());
    }

    if !email.is_empty() {
        let email_regex = regex::Regex::new(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
            .map_err(|_| "Error interno de validación de correo.".to_string())?;
        if !email_regex.is_match(email) {
            return Err("Correo electrónico inválido.".to_string());
        }
    }

    if phones.is_empty() || phones.iter().any(|p| p.trim().is_empty()) {
        return Err("Se requiere al menos un número de teléfono válido.".to_string());
    }

    let phone_regex = regex::Regex::new(r"^\+?[\d\s\-\(\)]+$")
        .map_err(|_| "Error interno de validación de teléfono.".to_string())?;

    if phones.iter().any(|p| !phone_regex.is_match(p.trim())) {
        return Err("Número de teléfono inválido.".to_string());
    }

    ct::insert(
        &state.pool(),
        id_user,
        name,
        email,
        phones.iter().map(|p| p.trim()).collect(),
    )
    .await
    .map_err(|_| "No se pudo agregar el contacto. Intente nuevamente más tarde.".to_string())?;

    Ok(())
}

#[tauri::command]
pub async fn update_contact(
    state: tauri::State<'_, AppState>,
    id_contact: String,
    name: String,
    email: String,
    phones: Vec<String>,
) -> Result<(), String> {

    let id_contact = id_contact.trim();
    let name = name.trim();
    let email = email.trim();

    if id_contact.is_empty() {
        return Err("Identificador de contacto inválido.".to_string());
    }

    if name.is_empty() {
        return Err("El nombre del contacto es obligatorio.".to_string());
    }

    if !email.is_empty() {
        let email_regex = regex::Regex::new(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
            .map_err(|_| "Error interno de validación de correo.".to_string())?;
        if !email_regex.is_match(email) {
            return Err("Correo electrónico inválido.".to_string());
        }
    }

    if phones.is_empty() || phones.iter().any(|p| p.trim().is_empty()) {
        return Err("Se requiere al menos un número de teléfono válido.".to_string());
    }

    let phone_regex = regex::Regex::new(r"^\+?[\d\s\-\(\)]+$")
        .map_err(|_| "Error interno de validación de teléfono.".to_string())?;

    if phones.iter().any(|p| !phone_regex.is_match(p.trim())) {
        return Err("Número de teléfono inválido.".to_string());
    }

    ct::update(
        &state.pool(),
        id_contact,
        name,
        email,
        phones.iter().map(|p| p.trim()).collect(),
    )
    .await
    .map_err(|_| "No se pudo actualizar el contacto. Intente nuevamente más tarde.".to_string())?;

    Ok(())
}


#[tauri::command]
pub async fn delete_contact(
    state: tauri::State<'_, AppState>,
    id_contact: String,
) -> Result<(), String> {

    let id_contact = id_contact.trim();

    if id_contact.is_empty() {
        return Err("Identificador de contacto inválido.".to_string());
    }

    ct::delete(&state.pool(), id_contact)
        .await
        .map_err(|_| {
            "No se pudo eliminar el contacto. Intente nuevamente más tarde."
                .to_string()
        })?;

    Ok(())
}


#[tauri::command]
pub async fn delete_all_contacts(
    state: tauri::State<'_, AppState>,
    id_user: String,
) -> Result<(), String> {

    let id_user = id_user.trim();

    if id_user.is_empty() {
        return Err("Usuario inválido.".to_string());
    }

    ct::delete_all(&state.pool(), id_user)
        .await
        .map_err(|_| {
            "No se pudieron eliminar los contactos. Intente nuevamente más tarde."
                .to_string()
        })?;

    Ok(())
}
