use crate::state::AppState;
use crate::models::passwords::{self as pwd, PasswordDto};


#[tauri::command]
pub async fn get_all_passwords(
    state: tauri::State<'_, AppState>,
    id_user: String,
) -> Result<Vec<PasswordDto>, String> {

    let id_user = id_user.trim();

    if id_user.is_empty() {
        return Err("Usuario inválido.".to_string());
    }

    pwd::get_all(&state.pool(), id_user)
        .await
        .map_err(|e| {
            println!("Error al obtener las contraseñas: {}", e);
            "No se pudieron obtener las contraseñas. Intente nuevamente más tarde."
                .to_string()
        })
}


#[tauri::command]
pub async fn insert_password(
    state: tauri::State<'_, AppState>,
    id_user: String,
    account: String,
    username: String,
    password: String,
) -> Result<(), String> {

    // Validaciones básicas
    if id_user.trim().is_empty() {
        return Err("Usuario inválido.".to_string());
    }

    let account = account.trim();
    let username = username.trim();
    let password = password.trim();

    if account.is_empty() || username.is_empty() || password.is_empty() {
        return Err("Todos los campos son obligatorios.".to_string());
    }

    pwd::insert(
        &state.pool(),
        &id_user,
        account,
        username,
        password,
    )
    .await
    .map_err(|_| {
        "No se pudo guardar la contraseña. Intente nuevamente más tarde."
            .to_string()
    })?;

    Ok(())
}


#[tauri::command]
pub async fn update_password(
    state: tauri::State<'_, AppState>,
    id_password: String,
    account: String,
    username: String,
    password: String,
) -> Result<(), String> {

    let id_password = id_password.trim();
    let account = account.trim();
    let username = username.trim();
    let password = password.trim();

    if account.is_empty() || username.is_empty() || password.is_empty() {
        return Err("Todos los campos son obligatorios.".to_string());
    }

    if id_password.is_empty() {
        return Err("Identificador de contraseña inválido.".to_string());
    }

    pwd::update(
        &state.pool(),
        id_password,
        account,
        username,
        password,
    )
    .await
    .map_err(|_| {
        "No se pudo actualizar la contraseña. Intente nuevamente más tarde."
            .to_string()
    })?;

    Ok(())
}


#[tauri::command]
pub async fn delete_password(
    state: tauri::State<'_, AppState>,
    id_password: String,
) -> Result<(), String> {

    let id_password = id_password.trim();

    if id_password.is_empty() {
        return Err("Identificador de contraseña inválido.".to_string());
    }

    pwd::delete(&state.pool(), id_password)
        .await
        .map_err(|_| {
            "No se pudo eliminar la contraseña. Intente nuevamente más tarde."
                .to_string()
        })?;

    Ok(())
}


#[tauri::command]
pub async fn delete_all_passwords(
    state: tauri::State<'_, AppState>,
    id_user: String,
) -> Result<(), String> {

    let id_user = id_user.trim();

    if id_user.is_empty() {
        return Err("Usuario inválido.".to_string());
    }

    pwd::delete_all(&state.pool(), id_user)
        .await
        .map_err(|_| {
            "No se pudieron eliminar las contraseñas. Intente nuevamente más tarde."
                .to_string()
        })?;

    Ok(())
}
