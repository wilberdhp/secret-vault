import { Lock } from "lucide-react"
import useApp from "../hooks/useApp"

function Header() {
  
  const setIsLoggedIn = useApp(state => state.setIsLoggedIn)
  
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Lock className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">Secure Vault</h1>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header