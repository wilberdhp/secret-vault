import NoteContent from "./NoteContent";
import ItemNote from "./ItemNote";
import { Plus } from "lucide-react";
import SearchNote from "./SearchNote";
import useApp from "../../hooks/useApp";
import useNote from "../../hooks/Notes/useNote";
import NoteModal from "../Modals/NoteModal";

function NotesPage() {
  
  const { 
    selectedNote, 
    setSelectedNote, 
    searchTerm, 
    setSearchTerm, 
    filterDate, 
    setFilterDate, 
    showDateFilter, 
    setShowDateFilter, 
    showFilter, 
    filteredNotes,
    getNotes
  } = useNote()

  const {showNoteModal, changeShowNoteModal }  = useApp()
  
  return (
    <>
      <div className="flex flex-col lg:flex-row h-full">
        <div className="w-full lg:w-1/3 pr-0 lg:pr-6 mb-6 lg:mb-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notas</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => changeShowNoteModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Nueva Nota
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <SearchNote 
            filterDate={filterDate}
            setFilterDate={setFilterDate}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setShowDateFilter={setShowDateFilter}
            showDateFilter={showDateFilter}
            showFilter={showFilter}
          />

          {/* Notes List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredNotes.map((note) => (
              <ItemNote 
                key={note.id}
                note={note}
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
              />
            ))}
          </div>

          {filteredNotes.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No hay notas</p>
          )}
        </div>

        {/* Note Content */}
        <NoteContent 
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          getNotes={getNotes}
        />
      </div>

      { showNoteModal && <NoteModal getNotes={getNotes} /> }
    </>
  );
}

export default NotesPage;
