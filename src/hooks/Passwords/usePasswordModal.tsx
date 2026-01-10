import { useEffect, useRef, useState } from "react";
import useApp from "../useApp";
import { analyzePassword, generatePassword } from "../../lib/password-functions";
import { invoke } from "@tauri-apps/api/core";
import { getPredefinedAccounts } from "../../lib/predefinedAccounts";

type Password = { account: string, username: string, password: string, image?: string }
type PasswordError = { account: string, username: string, password: string }

interface usePasswordModalProps {
  getPasswords: () => Promise<void>
} 

function usePasswordModal({ getPasswords }: usePasswordModalProps) {
  const [passwordForm, setPasswordForm] = useState<Password>({ account: "", username: "", password: "", image: "" })
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showAccountSuggestions, setShowAccountSuggestions] = useState(false);
  const [passwordFormErrors, setPasswordFormErrors] = useState<PasswordError>({ account: "", password: "", username: "" });


  const { editingPassword, changeEditingPassword, changeShowPasswordModal, idUser, changeShowErrorModal, setError, resolvedTheme } = useApp()

  useEffect(() => {
    if (editingPassword) setPasswordForm(editingPassword)
  }, [editingPassword])

  const accountSuggestionsRef = useRef<HTMLDivElement>(null);
  const inputAccountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutListProduct = (e: MouseEvent): void => {

      if (
        inputAccountRef.current &&
        inputAccountRef.current.contains(e.target as Node)
      ) {
        return
      }

      if (
        showAccountSuggestions &&
        accountSuggestionsRef.current &&
        !accountSuggestionsRef.current.contains(e.target as Node)
      ) {
        setShowAccountSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutListProduct)

    return () => document.addEventListener('mousedown', handleClickOutListProduct)
  }, [showAccountSuggestions])

  const isEditing = editingPassword && true
  
  const closeModal = (): void => {
    changeShowPasswordModal(false);
    setPasswordForm({ account: "", username: "", password: "", image: "" });
    setGeneratedPassword("");
    setPasswordStrength("");
    changeEditingPassword(null)
  };

  const generateSecurePassword = () => {
    const newPassword = generatePassword()
    setGeneratedPassword(newPassword);
    setPasswordForm({ ...passwordForm, password: newPassword });
    analyzePasswordStrength(newPassword);
  };

  const analyzePasswordStrength = (password: string) => {
    const strength = analyzePassword(password)
    setPasswordStrength(strength)
  };

  // Validate password form
  const validatePasswordForm = () => {
    const errors: PasswordError = { account: "", password: "", username: "" };
    if (!passwordForm.account.trim()) {
      errors.account = 'La cuenta es obligatoria';
    }
    if (!passwordForm.username.trim()) {
      errors.username = 'El usuario es obligatorio';
    }
    if (!passwordForm.password.trim()) {
      errors.password = 'La contraseña es obligatoria';
    } else if (passwordForm.password.trim().length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    const validation = !!errors.account.trim() || !!errors.username.trim() || !!errors.password.trim();
    
    if (validation) setPasswordFormErrors(errors);
    
    return validation
  };

  const handleAddPassword = async () => {

    console.log(validatePasswordForm())

    if (validatePasswordForm()) return;

    const { account, username, password } = passwordForm

    if (isEditing) {
      // Enviar los datos
      const idPassword = editingPassword.id  

      await invoke("update_password", { idPassword, account, username, password })
        .then()
        .catch((error) => {
          changeShowErrorModal(true)
          setError({ message: error })
        })
    } else {

      await invoke("insert_password", { idUser, account, username, password })
        .then()
        .catch((error) => {
          changeShowErrorModal(true)
          setError({ message: error })
        })
    }
    changeShowPasswordModal(false);
    setPasswordForm({ account: '', username: '', password: '', image: '' });
    setGeneratedPassword('');
    setPasswordStrength('');

    await getPasswords()
  };

  const predefinedAccounts = getPredefinedAccounts(resolvedTheme);

  const search = passwordForm.account.toLowerCase();

  const filteredPredefinedAccounts = Object.entries(predefinedAccounts)
    .filter(([name]) => name.toLowerCase().includes(search))
    .map(([name, logo]) => ({ name, logo }));
    
  return {
    passwordForm, 
    setPasswordForm, 
    generatedPassword, 
    passwordStrength, 
    isEditing, 
    closeModal, 
    generateSecurePassword, 
    analyzePasswordStrength, 
    handleAddPassword, 
    showAccountSuggestions, 
    setShowAccountSuggestions,
    filteredPredefinedAccounts,
    passwordFormErrors,
    accountSuggestionsRef,
    inputAccountRef
  }
}

export default usePasswordModal