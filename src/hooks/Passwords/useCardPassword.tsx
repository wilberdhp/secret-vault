import { useState } from "react"
import useApp from "../useApp"
import { TypePassword } from "../../types/types"
import { invoke } from "@tauri-apps/api/core"

type Password = {
  showPassword: boolean
  changeShowPassword: () => void
  handleDeletePassword: (id: string) => void
  handleEditPassword: (password: TypePassword) => void
}

interface useCardPasswordProps {
  getPasswords: () => Promise<void>
}

export default function useCardPassword({ getPasswords }: useCardPasswordProps): Password {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { changeEditingPassword, changeShowPasswordModal, changeShowWarningModal, setWarningAction, changeShowErrorModal, setError } = useApp()

  const changeShowPassword = () => {
    setShowPassword((pass) => !pass)
  }

  const handleEditPassword = (password: TypePassword) => {
    changeEditingPassword(password)
    changeShowPasswordModal(true)
  };

  const handleDeletePassword = async (idPassword: string) => {

    changeShowWarningModal(true);

    setWarningAction(async () => {
      await invoke("delete_password", { idPassword })
        .then(() => {
          getPasswords()
        })
        .catch((error) => {
          changeShowErrorModal(true)
          setError({ message: error })
        })
    })

    // await invoke("delete_password", { idPassword })
    //   .then(() => {
    //     getPasswords()
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
  }

  return {
    handleDeletePassword,
    changeShowPassword,
    showPassword,
    handleEditPassword
  }
}

