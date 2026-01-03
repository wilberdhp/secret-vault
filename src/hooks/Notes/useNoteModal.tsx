import { useState } from "react";
import useApp from "../useApp";
import { invoke } from "@tauri-apps/api/core";

type Note = { title: string, content: string }
type NoteError = { title: string, content: string }

interface useNoteModalProps {
  getNotes: () => Promise<void>
}

function useNoteModal({ getNotes }: useNoteModalProps) {
  const [noteForm, setNoteForm] = useState<Note>({ title: '', content: '' });
  const [noteFormErrors, setNoteFormErrors] = useState<NoteError>({ title: '', content: '' });

  const { changeShowNoteModal, idUser, changeShowErrorModal, setError } = useApp()

  // Validate note form
  const validateNoteForm = () => {
    const errors: NoteError = { title: '', content: '' };
    if (!noteForm.title.trim()) {
      errors.title = 'El título es obligatorio';
    }
    if (!noteForm.content.trim()) {
      errors.content = 'El contenido es obligatorio';
    }

    const validation = !!errors.title.trim() || !!errors.content.trim()
    
    if (validation) setNoteFormErrors(errors);
    
    return validation;
  };  

  const handleAddNote = async () => {

    if (!validateNoteForm()) return;

    const { title, content } = noteForm

    await invoke("insert_note", { idUser, title, content })
      .then()
      .catch((error) => {
        changeShowErrorModal(true)
        setError({ message: error })
      })

    changeShowNoteModal(false);
    setNoteForm({ title: '', content: '' });
    await getNotes();
  }; 

  const closeModal = () => {
    changeShowNoteModal(false);
    setNoteForm({ title: "", content: "" });
  };
  
  return {
    noteForm, 
    setNoteForm, 
    handleAddNote,
    closeModal,
    noteFormErrors 
  }
}

export default useNoteModal