import { useEffect, useState } from "react"
import { TypePassword } from "../../types/types"
import useApp from "../useApp"
import { invoke } from "@tauri-apps/api/core"

import { getPredefinedAccounts, PredefinedAccountKey } from "../../lib/predefinedAccounts" 



export default function usePassword() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [passwords, setPasswords] = useState<TypePassword[]>([])
  
  const { changeShowPasswordModal, changeEditingPassword, idUser, setWarningAction, changeShowWarningModal, setError, changeShowErrorModal, resolvedTheme } = useApp() 

  const getPasswords = async () => {
    await invoke<TypePassword[]>("get_all_passwords", { idUser })
      .then((value) => {

        const accounts = getPredefinedAccounts(resolvedTheme);

        const newPasswords = value.map((pass) => {
          return {
            ...pass,
            image: accounts[pass.account as PredefinedAccountKey]
          };
        });

        setPasswords(newPasswords)
      })
      .catch((error) => {
        changeShowErrorModal(true)
        setError({ message: error })
      })
  }

  useEffect(() => {
    getPasswords()
  }, [])

  const handleDeleteAllPasswords = async () => {
    changeShowWarningModal(true);

    setWarningAction(async () => {
      await invoke("delete_all_passwords", { idUser })
        .then(() => {
          getPasswords()
        })
        .catch((error) => {
          changeShowErrorModal(true)
          setError({ message: error })
        })
    })
  }

  const addPassword = () => {
    changeShowPasswordModal(true);
    changeEditingPassword(null);
  }

  const filteredPasswords = passwords.filter(p => 
    p.account.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    searchTerm, 
    setSearchTerm,
    handleDeleteAllPasswords,
    filteredPasswords,
    addPassword,
    getPasswords
  }
}