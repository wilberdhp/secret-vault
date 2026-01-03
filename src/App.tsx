import "./App.css";
import PasswordsPage from "./components/PasswordsPage/PasswordsPage";
import ContactsPage from "./components/ContactPage/ContactsPage";
import NotesPage from "./components/NotesPage/NotesPage";
import SettingsPage from "./components/SettingsPage/SettingsPage";
import ExportModal from "./components/Modals/ExportModal";
import useApp from "./hooks/useApp";
import Sidebar from "./components/SideBar/Sidebar";
import LogIn from "./components/LogIn";
import { useEffect } from "react";
import { setupSystemThemeListener } from "./lib/theme";
import WarningModal from "./components/Modals/WarningModal";
import ErrorModal from "./components/Modals/ErrorModal";

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

function App() {
  const { currentPage, showExportModal, showWarningModal, showErrorModal, logged, idUser, initTheme } = useApp()


  useEffect(() => {
    initTheme();
    setupSystemThemeListener();
  }, [])

  if (!logged || !idUser) {
    return (
      <LogIn />
    )
  }


  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-auto h-dvh">

          { currentPage === 'passwords' && <PasswordsPage /> }
          { currentPage === 'contacts' && <ContactsPage/> }
          { currentPage === 'notes' && <NotesPage/> }
          { currentPage === 'settings' && <SettingsPage/> }

        </main>
      </div>
      
      { showExportModal && <ExportModal/> }

      { showWarningModal && <WarningModal /> }

      { showErrorModal && <ErrorModal /> }
    </div>
  );
}

export default App;