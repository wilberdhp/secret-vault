import useApp from "../../hooks/useApp";
import { AlertCircle } from "lucide-react";

function ErrorModal() {
  const { error, setError, changeShowErrorModal } = useApp();

  const handleClick = () => {
    changeShowErrorModal(false);
    setError({ title: undefined, message: "" })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center mb-4">
          <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {error.title ?? "Error de operación"}
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{error.message}</p>
        <div className="flex justify-end">
          <button
            onClick={handleClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
