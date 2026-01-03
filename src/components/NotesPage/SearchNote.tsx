import { Filter, Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface SearchNoteProps {
  searchTerm: string, 
  setSearchTerm: Dispatch<SetStateAction<string>> 
  showFilter: () => void, 
  showDateFilter: boolean, 
  filterDate: string, 
  setFilterDate: Dispatch<SetStateAction<string>>, 
  setShowDateFilter: Dispatch<SetStateAction<boolean>>
}

function SearchNote({ searchTerm, setSearchTerm, showFilter, showDateFilter, filterDate, setFilterDate, setShowDateFilter }: SearchNoteProps) {
  
  
  return (
    <div className="mb-4">
      <div className="relative mb-2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Buscar notas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>
      <div className="relative">
        <button
          onClick={showFilter}
          className="flex items-center text-sm text-gray-500 dark:text-gray-400 w-full"
        >
          <Filter className="h-4 w-4 mr-1" />
          <span>Filtrar por fecha</span>
        </button>
        {showDateFilter && (
          <div className="absolute z-10 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-2">
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={() => {
                setFilterDate("");
                setShowDateFilter(false);
              }}
              className="ml-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm"
            >
              Limpiar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchNote;
