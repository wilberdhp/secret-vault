import { save } from '@tauri-apps/plugin-dialog';
import { invoke } from "@tauri-apps/api/core";
import { useState } from 'react'
import useApp from '../useApp';



function useExportModal() {
  const [exportPassword, setExportPassword] = useState('');

  const { changeShowExportModal, changeShowErrorModal, setError, idUser } = useApp()

  // En todas las funciones hay que pasar el idUser, ruta del archivo

  const handleExportData = () => {
    // TODO: Solicitar la exportación de todos los datos
  };

  // Export passwords to Excel
  const handleExportPasswords = async () => {

    if (!exportPassword.trim()) {
      changeShowErrorModal(true);
      setError({ message: 'La contraseña es obligatoria para exportar los datos.', title: 'Error de Exportación' });
      return;
    }
   
    const path = await save({
      filters: [{ name: 'CSV', extensions: ['csv'] }],
      defaultPath: 'passwords.csv'
    });

    if (!path) return;

    await invoke('export_passwords', { idUser, path, password: exportPassword })
    .catch((error) => {
      changeShowErrorModal(true);
      setError({ message: error, title: 'Error de Exportación' });
    });
    
    changeShowExportModal(false);
  };

  // Export contacts to Excel
  const handleExportContacts = async () => {
    if (!exportPassword.trim()) {
      changeShowErrorModal(true);
      setError({ message: 'La contraseña es obligatoria para exportar los datos.', title: 'Error de Exportación' });
      return;
    }
   
    const path = await save({
      filters: [{ name: 'VCF', extensions: ['vcf'] }],
      defaultPath: 'contacts.vcf'
    });

    if (!path) return;

    await invoke('export_contacts', { idUser, path, password: exportPassword })
    .catch((error) => {
      changeShowErrorModal(true);
      setError({ message: error, title: 'Error de Exportación' });
    });
    
    changeShowExportModal(false);
  };

  // Export notes to Excel
  const handleExportNotes = () => {
    // TODO: Solicitar sacar la información
  };

  const closeModal = () => {
    changeShowExportModal(false);
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