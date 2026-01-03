import usePassword from "../../hooks/Passwords/usePassword";
import useApp from "../../hooks/useApp";
import PasswordModal from "../Modals/PasswordModal";
import CardPassword from "./CardPassword";
import { Plus, Search } from "lucide-react";

function PasswordsPage() {
  
  const { searchTerm, setSearchTerm, handleDeleteAllPasswords, filteredPasswords, addPassword, getPasswords } = usePassword()
  
  const { showPasswordModal } = useApp()

  return (
    <>
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Contraseñas
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleDeleteAllPasswords}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Eliminar Todas
            </button>
            <button
              onClick={addPassword}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              Agregar
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar por cuenta o usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Passwords Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPasswords.map((password) => (
            <CardPassword 
              key={password.id}
              password={password}
              getPasswords={getPasswords}
            />
          ))}
        </div>
      </div>

      { showPasswordModal && <PasswordModal getPasswords={getPasswords}/> }    
    </>

  );
}

export default PasswordsPage;
