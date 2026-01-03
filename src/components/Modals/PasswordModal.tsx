import BaseModal from "./BaseModal";
import { ImageIcon, Shield } from "lucide-react";
import usePasswordModal from "../../hooks/Passwords/usePasswordModal";
import { estimateCrackTime } from "../../lib/password-functions";

interface PasswordModal {
  getPasswords: () => Promise<void>
}

function PasswordModal({ getPasswords }: PasswordModal) {
  
  const { passwordForm, setPasswordForm, generatedPassword, passwordStrength, isEditing, closeModal, generateSecurePassword, analyzePasswordStrength, handleAddPassword, filteredPredefinedAccounts, showAccountSuggestions, setShowAccountSuggestions, passwordFormErrors } = usePasswordModal({ getPasswords })

  

  return (
    <BaseModal
      closeModal={closeModal}
      title={isEditing ? "Editar Contraseña" : "Agregar Contraseña"}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Imagen
        </label>
        <div className="flex items-center space-x-4">
          {passwordForm.image ? (
            <img
              src={passwordForm.image}
              alt="Preview"
              className="w-16 h-16 rounded" // object-cover
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Cuenta
        </label>
        <input
          type="text"
          value={passwordForm.account}
          onChange={(e) => {
            const account = e.target.value;
            setPasswordForm({
              ...passwordForm,
              account,
              image: passwordForm.image || getAppLogo(account),
            });
            setShowAccountSuggestions(account.trim().length > 0);
          }}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            passwordFormErrors.account ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="Nombre de la cuenta"
          onFocus={() => setShowAccountSuggestions(true)}
        />

        {passwordFormErrors.account && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{passwordFormErrors.account}</p>
        )}

        {showAccountSuggestions && filteredPredefinedAccounts.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredPredefinedAccounts.map((account) => (
              <div
                key={account.name}
                onClick={() => {
                  setPasswordForm({ 
                    ...passwordForm, 
                    account: account.name,
                    image: account.logo
                  });
                  setShowAccountSuggestions(false);
                }}
                className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0"
              >
                <img src={account.logo} alt={account.name} className="w-8 h-8 rounded mr-3" />
                <span className="text-gray-700 dark:text-gray-300">{account.name}</span>
              </div>
            ))}
          </div>
        )}

      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Usuario
        </label>
        <input
          type="text"
          value={passwordForm.username}
          onChange={(e) =>
            setPasswordForm({ ...passwordForm, username: e.target.value })
          }
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            passwordFormErrors.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="Nombre de usuario"
        />

        {passwordFormErrors.username && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{passwordFormErrors.username}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Contraseña
        </label>
        <div className="relative">
          <input
            type="password"
            value={passwordForm.password}
            onChange={(e) => {
              setPasswordForm({ ...passwordForm, password: e.target.value });
              analyzePasswordStrength(e.target.value);
            }}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              passwordFormErrors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Contraseña"
          />
        </div>
        {passwordFormErrors.password && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{passwordFormErrors.password}</p>
        )}
      </div>

      {passwordForm.password && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700 dark:text-gray-300">
              Fuerza: <span className="font-medium ">{passwordStrength}</span>
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              Tiempo para descifrar: {estimateCrackTime(passwordForm.password)}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                passwordStrength === "Débil"
                  ? "bg-red-500 w-1/4"
                  : passwordStrength === "Media"
                  ? "bg-yellow-500 w-2/4"
                  : passwordStrength === "Fuerte"
                  ? "bg-blue-500 w-3/4"
                  : "bg-green-500 w-full"
              }`}
            ></div>
          </div>
        </div>
      )}

      <button
        onClick={generateSecurePassword}
        className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
      >
        <Shield className="h-4 w-4 mr-2" />
        Generar Contraseña Segura
      </button>

      {generatedPassword && (
        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Contraseña generada:
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">{generatedPassword}</p>
        </div>
      )}

      <div className="flex space-x-3 pt-4">
        <button
          onClick={handleAddPassword}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isEditing ? "Actualizar" : "Guardar"}
        </button>
        <button
          onClick={closeModal}
          className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          Cancelar
        </button>
      </div>
    </BaseModal>
  );
}

export default PasswordModal;
