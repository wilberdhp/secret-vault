use crate::state::AppState;
use crate::models::notes::{self as nt, NoteDto};

#[tauri::command]
pub async fn get_all_notes(
    state: tauri::State<'_, AppState>,
    id_user: String,
) -> Result<Vec<NoteDto>, String> {

    let id_user = id_user.trim();

    if id_user.is_empty() {
        return Err("Usuario inválido.".to_string());
    }

    nt::get_all(&state.pool(), id_user)
        .await
        .map_err(|_| {
            "No se pudieron obtener las notas. Intente nuevamente más tarde."
                .to_string()
        })
}

#[tauri::command]
pub async fn insert_note(
    state: tauri::State<'_, AppState>,
    id_user: String,
    title: String,
    content: String,
) -> Result<(), String> {

    let id_user = id_user.trim();
    let title = title.trim();
    let content = content.trim();

    if id_user.is_empty() {
        return Err("Usuario inválido.".to_string());
    }

    if title.is_empty() {
        return Err("El título de la nota es obligatorio.".to_string());
    }

    if content.is_empty() {
        return Err("El contenido de la nota es obligatorio.".to_string());
    }

    nt::insert(
        &state.pool(),
        id_user,
        title,
        content,
    )
    .await
    .map_err(|_| {
        "No se pudo guardar la nota. Intente nuevamente más tarde."
            .to_string()
    })?;

    Ok(())
}

#[tauri::command]
pub async fn update_note(
    state: tauri::State<'_, AppState>,
    id_note: String,
    title: String,
    content: String,
) -> Result<(), String> {

    let id_note = id_note.trim();
    let title = title.trim();
    let content = content.trim();

    if id_note.is_empty() {
        return Err("Identificador de nota inválido.".to_string());
    }

    if title.is_empty() {
        return Err("El título de la nota es obligatorio.".to_string());
    }

    if content.is_empty() {
        return Err("El contenido de la nota es obligatorio.".to_string());
    }

    nt::update(
        &state.pool(),
        id_note,
        title,
        content,
    )
    .await
    .map_err(|_| {
        "No se pudo actualizar la nota. Intente nuevamente más tarde."
            .to_string()
    })?;

    Ok(())
}


#[tauri::command]
pub async fn delete_note(
    state: tauri::State<'_, AppState>,
    id_note: String,
) -> Result<(), String> {

    let id_note = id_note.trim();

    if id_note.is_empty() {
        return Err("Identificador de nota inválido.".to_string());
    }

    nt::delete(&state.pool(), id_note)
        .await
        .map_err(|_| {
            "No se pudo eliminar la nota. Intente nuevamente más tarde."
                .to_string()
        })?;

    Ok(())
}


#[tauri::command]
pub async fn delete_all_notes(
    state: tauri::State<'_, AppState>,
    id_user: String,
) -> Result<(), String> {

    let id_user = id_user.trim();

    if id_user.is_empty() {
        return Err("Usuario inválido.".to_string());
    }

    nt::delete_all(&state.pool(), id_user)
        .await
        .map_err(|_| {
            "No se pudieron eliminar las notas. Intente nuevamente más tarde."
                .to_string()
        })?;

    Ok(())
}
