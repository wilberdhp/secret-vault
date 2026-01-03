import { invoke } from "@tauri-apps/api/core"
import { TypeContact } from "../../types/types"
import useApp from "../useApp"

interface useCardContactProps {
  getContacts: () => Promise<void>
}

function useCardContact({ getContacts }: useCardContactProps) {
  const { changeEditingContact, changeShowContactModal, changeShowWarningModal, setWarningAction, changeShowErrorModal, setError } = useApp()


  const handleEditContact = (contact: TypeContact) => {
    
    changeEditingContact(contact)
    changeShowContactModal(true)
  }

  const handleDeleteContact = async (idContact: string) => {

    changeShowWarningModal(true);

    setWarningAction(async () => {
      await invoke("delete_contact", { idContact })
        .then(() => {
          getContacts()
        })
        .catch((error) => {
          changeShowErrorModal(true)
          setError({ message: error })
        })      
    })

    // await invoke("delete_contact", { idContact })
    //   .then(() => {
    //     console.log("Contacto eliminado")
    //     getContacts()
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
  }
  
  return {
    handleEditContact,
    handleDeleteContact
  }
}

export default useCardContact