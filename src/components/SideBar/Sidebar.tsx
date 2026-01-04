import { FileText, Key, Lock, SidebarClose, SidebarOpen, User } from "lucide-react";
import { useState } from "react";
import UserMenu from "./UserMenu";
import LiButtonPage from "./LiButtonPage";

function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  
  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-15.5"
      } bg-white dark:bg-gray-800 shadow-lg flex flex-col transition-all duration-300`}
    >
      <div className="p-4 ">
        <div className="flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center space-x-3">
              <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              {/* <h1 className="text-xl font-bold text-gray-900 dark:text-white">Secret Vault</h1> */}
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(state => !state)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {/* <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" /> */}
            {
              sidebarOpen ? 
              <SidebarClose className="h-5 w-5 text-gray-600 dark:text-gray-300" /> : 
              <SidebarOpen className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            }
          </button>
        </div>
      </div>
      <nav className="flex-1 p-4 px-3">
        <ul className="space-y-2">
          <LiButtonPage sidebarOpen={sidebarOpen} text={"Contraseñas"} page={"passwords"}>
            <Key className="h-5 w-5" />
          </LiButtonPage>

          <LiButtonPage sidebarOpen={sidebarOpen} text={"Contactos"} page={"contacts"}>
            <User className="h-5 w-5" />
          </LiButtonPage>

          <LiButtonPage sidebarOpen={sidebarOpen} text={"Notas"} page={"notes"}>
            <FileText className="h-5 w-5" />
          </LiButtonPage>

        </ul>
      </nav>

      {/* User Menu */}
      <UserMenu 
        sidebarOpen={sidebarOpen}
      />
    </div>
  );
}

export default Sidebar;
