import { useEffect, useState } from "react"
import { TypeNote } from "../../types/types"
import { invoke } from "@tauri-apps/api/core"
import useApp from "../useApp"
import { formatDate } from "../../lib/date"



function useNote(){
  const [selectedNote, setSelectedNote] = useState<TypeNote | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showDateFilter, setShowDateFilter] = useState<boolean>(false)
  const [filterDate, setFilterDate] = useState<string>('')
  const [notes, setNotes] = useState<TypeNote[]>([])

  const { idUser, changeShowErrorModal, setError } = useApp();

  const getNotes = async () => {
    await invoke<TypeNote[]>("get_all_notes", { idUser })
      .then((value) => {
        setNotes(value)
      })
      .catch((error) => {
        changeShowErrorModal(true)
        setError({ message: error })
      })
  }

  useEffect(() => {
    getNotes()
  }, [])

  const showFilter = () => {
    setShowDateFilter(filter => !filter)
  }


  const filteredNotes = notes.filter(n => 
    (n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     n.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
     (!filterDate || formatDate(n.date) === filterDate)
  );

  return {
    selectedNote, 
    setSelectedNote, 
    searchTerm, 
    setSearchTerm, 
    showDateFilter, 
    setShowDateFilter, 
    showFilter,
    filterDate, 
    setFilterDate,
    filteredNotes,
    getNotes
  }
}

export default useNote