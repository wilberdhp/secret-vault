use secrecy::SecretString;
use tauri::Manager;

mod commands;
mod db;
mod exports;
mod models;
mod security;
mod state;

mod secret;
use secret::MASTER_PASSWORD;

fn get_master_password() -> SecretString {
    if MASTER_PASSWORD.is_empty() {
        panic!("MASTER_PASSWORD está vacía. Revisa el archivo secret.rs. Si no existe lee el README para configurarlo");
    }
    SecretString::new(String::from(MASTER_PASSWORD))
}

use crate::db::db::init_db;
use crate::state::AppState;

use crate::commands::contacts::{
    delete_all_contacts, delete_contact, get_all_contacts, insert_contact, update_contact,
};
use crate::commands::exports::{
    export_contacts, export_notes, export_passwords, export_zip,
};
use crate::commands::notes::{
    delete_all_notes, delete_note, get_all_notes, insert_note, update_note,
};
use crate::commands::passwords::{
    delete_all_passwords, delete_password, get_all_passwords, insert_password, update_password,
};
use crate::commands::users::{change_password, change_username, delete_user, login, signup};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            let master_password = get_master_password();

            let pool = tauri::async_runtime::block_on(init_db(app.app_handle(), master_password));

            app.manage(AppState::new(pool));
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_all_passwords,
            insert_password,
            update_password,
            delete_password,
            delete_all_passwords,
            get_all_notes,
            insert_note,
            update_note,
            delete_note,
            delete_all_notes,
            get_all_contacts,
            insert_contact,
            update_contact,
            delete_contact,
            delete_all_contacts,
            login,
            signup,
            delete_user,
            change_password,
            change_username,
            export_contacts,
            export_notes,
            export_passwords,
            export_zip
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
