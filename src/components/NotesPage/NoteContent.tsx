import { FileText, Trash2 } from "lucide-react";
import { TypeNote } from "../../types/types";
import useNoteContent from "../../hooks/Notes/useNoteContent";
import { formatDate } from "../../lib/date";

interface NoteContentProps {
  selectedNote: TypeNote | null
  setSelectedNote: (note: TypeNote | null) => void
  getNotes: () => Promise<void>
}

function NoteContent({ selectedNote, setSelectedNote, getNotes }: NoteContentProps) {
  
  const { handleDeleteNote, handleSaveNote } = useNoteContent({ selectedNote, getNotes })
  
  return (
    <div className="w-full lg:w-2/3 pl-0 lg:pl-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full">
        {selectedNote ? (
          <div className="h-full flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) =>
                  setSelectedNote({ ...selectedNote, title: e.target.value, date: new Date().getTime() })
                }
                className="text-xl font-bold text-gray-900 dark:text-white bg-transparent border-none focus:outline-none flex-1 w-full mb-2 sm:mb-0"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSaveNote(selectedNote.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                >
                  Guardar
                </button>
                <button
                  onClick={() => {
                    handleDeleteNote(selectedNote.id)
                    setSelectedNote(null)
                  }}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <textarea
              value={selectedNote.content}
              onChange={(e) =>
                setSelectedNote({ ...selectedNote, content: e.target.value, date: new Date().getTime() })
              }
              className="flex-1 w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Escribe tu nota aquí..."
            />
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {formatDate(selectedNote.date)}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-500" />
              <p>Selecciona una nota para ver su contenido</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteContent;
