import useNoteModal from "../../hooks/Notes/useNoteModal";
import BaseModal from "./BaseModal";

interface NoteModalProps {
  getNotes: () => Promise<void>
}

function NoteModal({ getNotes }: NoteModalProps) {
  
  const { noteForm, setNoteForm, closeModal, handleAddNote, noteFormErrors  } = useNoteModal({ getNotes })

  return (
    <BaseModal
      closeModal={closeModal}
      title="Agregar Nota"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Título
        </label>
        <input
          type="text"
          value={noteForm.title}
          onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            noteFormErrors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="Título de la nota"
        />
        {noteFormErrors.title && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{noteFormErrors.title}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Contenido
        </label>
        <textarea
          value={noteForm.content}
          onChange={(e) =>
            setNoteForm({ ...noteForm, content: e.target.value })
          }
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            noteFormErrors.content ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="Contenido de la nota..."
        />

        {noteFormErrors.content && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{noteFormErrors.content}</p>
        )}
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          onClick={handleAddNote}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Guardar
          {/* {isEditing ? 'Actualizar' : 'Guardar'} */}
        </button>
        <button
          onClick={closeModal}
          className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          Cancelar
        </button>
      </div>
    </BaseModal>
  );
}

export default NoteModal;
