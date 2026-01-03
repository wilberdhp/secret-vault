import { formatDate } from "../../lib/date";
import { TypeNote } from "../../types/types";

interface ItemNoteProps {
  note: TypeNote;
  setSelectedNote: (note: TypeNote) => void;
  selectedNote: TypeNote | null;
}

function ItemNote({ note, selectedNote, setSelectedNote }: ItemNoteProps) {
  return (
    <div
      onClick={() => setSelectedNote(note)}
      className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
        selectedNote && selectedNote.id === note.id
          ? "bg-blue-50 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700"
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-gray-900 dark:text-white truncate">{note.title}</h4>
        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
          {formatDate(note.date)}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{note.content}</p>
    </div>
  );
}

export default ItemNote;
