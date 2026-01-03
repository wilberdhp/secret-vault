import useExportModal from "../../hooks/Settings/useExportModal";
import BaseModal from "./BaseModal";

function ExportModal() {

  const { exportPassword, setExportPassword, closeModal, handleExportContacts, handleExportData, handleExportNotes, handleExportPasswords } = useExportModal()

  return (
    <BaseModal closeModal={closeModal} title="Exportar Datos">
      <p className="text-gray-600 dark:text-gray-400">
        Para exportar todos tus datos, introduce tu contraseña de inicio de
        sesión:
      </p>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Contraseña
        </label>
        <input
          type="password"
          value={exportPassword}
          onChange={(e) => setExportPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Introduce tu contraseña"
        />
      </div>

      <div className="pt-4">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          Selecciona el formato de exportación:
        </h4>
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={handleExportData}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex justify-between"
          >
            <span>Exportar todos los datos</span> <span>.zip</span>
             
          </button>
          <button
            onClick={handleExportPasswords}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex justify-between"
          >
            <span>Exportar Contraseñas</span> <span>.csv</span>
             
          </button>
          <button
            onClick={handleExportContacts}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex justify-between"
          >
            <span>Exportar Contactos</span> <span>.vcf</span>
             
          </button>
          <button
            onClick={handleExportNotes}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex justify-between"
          >
            <span>Exportar Notas</span> <span>.txt</span>
             
          </button>
        </div>
      </div>

      <button
        onClick={closeModal}
        className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 mt-4"
      >
        Cancelar
      </button>
    </BaseModal>
  );
}

export default ExportModal;
