import React from "react";
import { TypePassword } from "../../types/types";
import { Edit, Eye, EyeOff, Trash2 } from "lucide-react";
import useCardPassword from "../../hooks/Passwords/useCardPassword";

interface CardPasswordProps {
  password: TypePassword
  getPasswords: () => Promise<void>
}

function CardPassword({ password, getPasswords }: CardPasswordProps): React.JSX.Element {
  
  const { handleDeletePassword, changeShowPassword, showPassword, handleEditPassword } = useCardPassword({ getPasswords })
  
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center mb-4">
        <img
          src={password.image}
          alt={password.account}
          className="w-10 h-10 rounded mr-3"
        />
        <h3 className="font-semibold text-gray-900 dark:text-white">{password.account}</h3>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">Usuario:</span> {password.username}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">Contraseña:</span>{" "}
          {showPassword ? password.password : "••••••••"}
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={changeShowPassword}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditPassword(password)}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeletePassword(password.id)}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardPassword;
