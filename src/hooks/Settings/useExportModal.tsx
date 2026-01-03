import { useState } from 'react'
import useApp from '../useApp';

function useExportModal() {
  const [exportPassword, setExportPassword] = useState('');

  const setShowExportModal = useApp(state => state.changeShowExportModal)

  // En todas las funciones hay que pasar el idUser, ruta del archivo

  const handleExportData = () => {
    // TODO: Solicitar la exportación de todos los datos
  };

  // Export passwords to Excel
  const handleExportPasswords = () => {
    // TODO: Solicitar sacar la información
    
  };

  // Export contacts to Excel
  const handleExportContacts = () => {
    // TODO: Solicitar sacar la información
  };

  // Export notes to Excel
  const handleExportNotes = () => {
    // TODO: Solicitar sacar la información
  };

  const closeModal = () => {
    setShowExportModal(false);
  };

  return {
    exportPassword, 
    setExportPassword,
    handleExportData,
    handleExportPasswords,
    handleExportContacts,
    handleExportNotes,
    closeModal
  }
}

export default useExportModal