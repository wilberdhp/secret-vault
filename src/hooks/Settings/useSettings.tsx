import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import useApp from "../useApp";

export default function useSettings() {

  const { idUser, username, setUsername, changeShowWarningModal, setWarningAction, reset } = useApp();
  
  const [newUsername, setNewUsername] = useState(username);

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [error, setError] = useState('')

  const handleChangePassword = async () => {
    
    if (!newPassword.trim() || newPassword.trim().length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return
    }

    if (newPassword !== confirmNewPassword) {
      setError("Las contraseñas no coinciden");
      return
    }
    
    await invoke("change_password", { idUser, currentPassword, newPassword, confirmNewPassword })
      .then(() => {
        setCurrentPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
        setError('')
      })
      .catch((error) => {
        setError(error)
      })
  }

  const handleChangeUsername = async () => {
    if (newUsername && newUsername.trim().length > 3 && username !== newUsername) {
      await invoke<string>("change_username", { idUser, newUsername })
        .then((value) => {
          setUsername(value)
        })
        .catch((error) => {
          setError(error)
        })
    }

    setError("No se pudo actualizar el nombre de usuario. Intente nuevamente más tarde.");
  }

  const handleDeleteUser = async () => {
    changeShowWarningModal(true);

    setWarningAction(async () => {
      await invoke("delete_user", { idUser })
        .then(() => {
          reset()
        })
        .catch((err) => {
          setError(err)
        })
    })
  }

  return {
    currentPassword, 
    setCurrentPassword,
    newPassword, 
    setNewPassword,
    confirmNewPassword, 
    setConfirmNewPassword,
    handleChangePassword,
    error,
    newUsername, 
    setNewUsername,
    showThemeDropdown, 
    setShowThemeDropdown,
    handleChangeUsername,
    handleDeleteUser
  }
}

