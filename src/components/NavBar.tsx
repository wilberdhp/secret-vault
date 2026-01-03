import { FileText, Key, Settings, User } from "lucide-react";
import React from "react";
import useApp from "../hooks/useApp";

function NavBar(): React.JSX.Element {
  
  const { currentPage, changeCurrentPage } = useApp()
  
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4 overflow-x-auto">
          <button
            onClick={() => changeCurrentPage("passwords")}
            className={`py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${
              currentPage === "passwords"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Key className="inline h-4 w-4 mr-1" />
            Contraseñas
          </button>
          <button
            onClick={() => changeCurrentPage("contacts")}
            className={`py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${
              currentPage === "contacts"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <User className="inline h-4 w-4 mr-1" />
            Contactos
          </button>
          <button
            onClick={() => changeCurrentPage("notes")}
            className={`py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${
              currentPage === "notes"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <FileText className="inline h-4 w-4 mr-1" />
            Notas
          </button>
          <button
            onClick={() => changeCurrentPage("settings")}
            className={`py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${
              currentPage === "settings"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Settings className="inline h-4 w-4 mr-1" />
            Configuración
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
