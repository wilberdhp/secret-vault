import {
  AlertCircle,
  ChevronDown,
  Download,
  Monitor,
  Moon,
  Sun,
  Trash2,
} from "lucide-react";
import useSettings from "../../hooks/Settings/useSettings";
import useApp from "../../hooks/useApp";

function SettingsPage() {
  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    handleChangePassword,
    error,
    newUsername,
    setNewUsername,
    showThemeDropdown,
    setShowThemeDropdown,
    handleChangeUsername,
    handleDeleteUser
  } = useSettings();

  const { changeShowExportModal, theme, setTheme, username } = useApp();

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Configuración
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center dark:bg-red-900/30 dark:border-red-700 dark:text-red-300">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="space-y-8">

          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Cuenta
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Nombre de usuario"
                />
              </div>
              <div className="mt-6">
                <button
                  onClick={handleChangeUsername}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                  disabled={username === newUsername || newUsername.trim().length < 3}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Cambiar Contraseña de Inicio
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Contraseña Actual
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Introduce la contraseña actual"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Introduce la nueva contraseña"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirmar Nueva Contraseña
                </label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Confirma la nueva contraseña"
                />
              </div>
              <button
                onClick={handleChangePassword}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                disabled={!currentPassword || !newPassword || !confirmNewPassword}
              >
                Cambiar Contraseña
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Tema
            </h3>
            <div className="relative">
              <button
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {theme === "light" && (
                  <div className="flex items-center">
                    <Sun className="h-4 w-4 mr-2" />
                    <span>Claro</span>
                  </div>
                )}
                {theme === "dark" && (
                  <div className="flex items-center">
                    <Moon className="h-4 w-4 mr-2" />
                    <span>Oscuro</span>
                  </div>
                )}
                {theme === "system" && (
                  <div className="flex items-center">
                    <Monitor className="h-4 w-4 mr-2" />
                    <span>Sistema</span>
                  </div>
                )}
                <ChevronDown className="h-4 w-4" />
              </button>

              {showThemeDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                  <button
                    onClick={() => {
                      setTheme("light");
                      setShowThemeDropdown(false);
                    }}
                    className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                  >
                    <Sun className="h-4 w-4 mr-2" />
                    <span>Claro</span>
                  </button>
                  <button
                    onClick={() => {
                      setTheme("dark");
                      setShowThemeDropdown(false);
                    }}
                    className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                  >
                    <Moon className="h-4 w-4 mr-2" />
                    <span>Oscuro</span>
                  </button>
                  <button
                    onClick={() => {
                      setTheme("system");
                      setShowThemeDropdown(false);
                    }}
                    className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                  >
                    <Monitor className="h-4 w-4 mr-2" />
                    <span>Sistema</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Exportar Datos
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Exporta todos tus datos
            </p>
            <div className="">
              <button
                onClick={() => changeShowExportModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </button>

            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Zona peligrosa
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Eliminar la cuenta y todos los datos. Esta operación no se puede deshacer.
            </p>
            <div>

              <button
                onClick={handleDeleteUser}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex gap-1 items-center" >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar cuenta
              </button>
              
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
