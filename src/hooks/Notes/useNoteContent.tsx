import { invoke } from "@tauri-apps/api/core"
import { TypeNote } from "../../types/types"
import useApp from "../useApp"

interface useNoteContentProps {
  selectedNote: TypeNote | null
  getNotes: () => Promise<void>
}

function useNoteContent({ selectedNote, getNotes }: useNoteContentProps) {

  const { changeShowWarningModal, setWarningAction, changeShowErrorModal, setError }= useApp()

  const handleSaveNote = async (idNote: string) => {

    if (!selectedNote) return

    const { title, content } = selectedNote

    if (!title.trim() || !content.trim()) changeShowErrorModal(true)

    if (!title.trim()) {
      setError({ message: 'El título de la nota es obligatorio.' })
      return
    }

    if (!content.trim()) {
      setError({ message: 'El contenido de la nota es obligatorio.' })
      return
    }

    await invoke("update_note", { idNote, title, content })
      .then(() => {
        getNotes()
      })
      .catch((error) => {
        changeShowErrorModal(true)
        setError({ message: error })
      })
  }

  const handleDeleteNote = async (idNote: string) => {

    changeShowWarningModal(true);

    setWarningAction(async () => {
      await invoke("delete_note", { idNote })
        .then(() => {
          getNotes()
        })
        .catch((error) => {
          changeShowErrorModal(true)
          setError({ message: error })
        })      
    })
  }

  return {
    handleSaveNote,
    handleDeleteNote
  }
}

export default useNoteContent