import { useEffect, useState } from "react"
import { TypeContact } from "../../types/types"
import useApp from "../useApp"
import { invoke } from "@tauri-apps/api/core"

export default function useContact() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [contacts, setContacts] = useState<TypeContact[]>([])

  const { changeShowContactModal, changeEditingContact, idUser, changeShowWarningModal, setWarningAction, changeShowErrorModal, setError } = useApp()

  const getContacts = async () => {
    await invoke<TypeContact[]>("get_all_contacts", { idUser })
      .then((value) => {
        setContacts(value)
      })
      .catch((error) => {
        changeShowErrorModal(true)
        setError({ message: error })
      })
  }

  useEffect(() => {
    getContacts()
  }, [])


  const handleDeleteAllContacts = async () => {

    changeShowWarningModal(true);

    setWarningAction(async () => {
      await invoke("delete_all_contacts", { idUser })
        .then(() => {
          getContacts()
        })
        .catch((error) => {
          changeShowErrorModal(true)
          setError({ message: error })
        })  
    })

    // await invoke("delete_all_contacts", { idUser })
    //   .then(() => {
    //     getContacts()
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
  }

  const addContact = () => {
    changeShowContactModal(true)
    changeEditingContact(null)
  }

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phones.some(phone => phone.includes(searchTerm))
  );

  return {
    searchTerm, 
    setSearchTerm,
    handleDeleteAllContacts,
    addContact,
    filteredContacts,
    getContacts
  }
}

