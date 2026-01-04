import { AlertCircle, Lock } from "lucide-react";
import useLogin from "../hooks/Login/useLogin";
import { SpinnerLoader } from "./Icons";

function LogIn(): React.JSX.Element {

  const { 
    username,
    setUsername,
    password,
    setPassword,
    loading,
    error,
    showSignup,
    handleSubmit,
    changeSignup
  } = useLogin()

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 to-purple-900 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Lock className="mx-auto h-16 w-16 text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Secret Vault</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {showSignup 
              ? 'Crea tu cuenta para comenzar' 
              : 'Inicia sesión para acceder a tus datos'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Usuario</label>
            <input
              type="text"
              name="username"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Introduce tu nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contraseña</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Introduce tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-200 flex justify-center items-end gap-0.5"
            disabled={loading || !password.trim() || !username.trim()}
          >
            { 
              showSignup ? 
                loading ? "Registrando" : "Registrarse" :
                loading ? "Iniciando Sesión" : "Iniciar Sesión" 
            } 
            
            { loading ? <SpinnerLoader className="text-white" /> : "" }
          </button>
          
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            {
              showSignup ? "¿Ya tienes una cuenta? " : "¿No tienes una cuenta? "
            }
            
            <button
              type="button"
              onClick={changeSignup}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300  font-medium disabled:text-blue-300"
              disabled={loading}
            >
              { !showSignup ? "Registrarse" : "Iniciar Sesión" }
              
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
