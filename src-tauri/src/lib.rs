use tauri::Manager;

mod db;
mod models;
mod security;
mod commands;
mod state;
mod env;

use crate::state::AppState;
use crate::db::db::init_db;


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
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
