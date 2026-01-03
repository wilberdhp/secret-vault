import { AlertTriangle } from "lucide-react";
import useApp from "../../hooks/useApp";

function WarningModal() {
  const { changeShowWarningModal, warningAction, setWarningAction } = useApp();

  const handleClick = () => {
    if (warningAction) warningAction();

    setWarningAction(null);
    changeShowWarningModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Confirmar Acción
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          ¿Estás seguro de que deseas realizar esta acción? Esta operación no se
          puede deshacer.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => changeShowWarningModal(false)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={handleClick}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default WarningModal;
