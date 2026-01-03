import { ChevronDown, ChevronUp, LogOut, Settings, UserCircle } from "lucide-react";
import useApp from "../../hooks/useApp";
import { useEffect, useRef, useState } from "react";

interface UserMenuProps {
  sidebarOpen: boolean;
}

function UserMenu({ sidebarOpen }: UserMenuProps) {
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const { changeCurrentPage, username, reset } = useApp();

  const userMenuRef = useRef<HTMLDivElement>(null)
  const userBtnMenuRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutListProduct = (e: MouseEvent): void => {

      if (
        userBtnMenuRef.current &&
        userBtnMenuRef.current.contains(e.target as Node)
      ) {
        return
      }

      if (
        showUserMenu &&
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutListProduct)

    return () => document.addEventListener('mousedown', handleClickOutListProduct)
  }, [showUserMenu, setShowUserMenu])


  return (
    <div className="p-4 px-2.25 border-t border-t-gray-200 dark:border-gray-700">
      <div className="relative">
        <button
          ref={userBtnMenuRef}
          onClick={() => setShowUserMenu(state => !state)}
          className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
        >
          <div className="flex items-center space-x-3">
            <span className="h-7 w-7 flex justify-center items-center">
              <UserCircle className="h-7 w-7  flex justify-center items-center" />
            </span>
            {sidebarOpen && <span>@{username}</span>}
          </div>
          {sidebarOpen && (
            <>
            {
              showUserMenu ? 
                <ChevronUp className="h-4 w-4" /> :
                <ChevronDown className="h-4 w-4" />
            }
            
            </>
          )}
        </button>

        {showUserMenu && (
          <div ref={userMenuRef} className="absolute flex flex-col gap-1 p-1 bottom-full left-0 mb-2 w-52 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-50">
            <button
              onClick={() => {
                changeCurrentPage("settings");
                setShowUserMenu(false);
              }}
              className="w-full rounded-xl flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left"
            >
              <Settings className="h-4 w-4" />
              <span>Configuración</span>
            </button>
            <button
              onClick={() => {
                // setIdUser('');
                // setIsLoggedIn(false);
                // changeCurrentPage("passwords");
                reset()
              }}
              className="w-full rounded-xl flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 text-left border-t border-gray-200 dark:border-gray-700"
            >
              <LogOut className="h-4 w-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserMenu;
