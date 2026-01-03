use tauri::Manager;

mod db;
mod models;
mod security;
mod commands;
mod state;
mod env;

use crate::state::AppState;
use crate::db::db::init_db;

use crate::commands::passwords::{get_all_passwords, insert_password, update_password, delete_password, delete_all_passwords};
use crate::commands::notes::{get_all_notes, insert_note, update_note, delete_note, delete_all_notes};
use crate::commands::contacts::{get_all_contacts, insert_contact, update_contact, delete_contact, delete_all_contacts};
use crate::commands::users::{login, signup, delete_user, change_password, change_username};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let master_password = env::get_master_password();

            let pool = tauri::async_runtime::block_on(
                init_db(app.app_handle(), master_password)
            );

            app.manage(AppState::new(pool));
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_all_passwords, insert_password, update_password, delete_password, delete_all_passwords,
            get_all_notes, insert_note, update_note, delete_note, delete_all_notes,
            get_all_contacts, insert_contact, update_contact, delete_contact, delete_all_contacts,
            login, signup, delete_user, change_password, change_username
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
