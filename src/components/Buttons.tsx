import { Plus } from "lucide-react";

interface BtnAddProps {
  add: () => void;
}

export function BtnAdd({ add }: BtnAddProps): React.JSX.Element {
  const handleClick = (): void => {
    add();
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
    >
      <Plus className="h-4 w-4 mr-1" />
      Agregar
    </button>
  );
}

interface BtnRemoveAllProps {
  removeAll: () => void;
}

export function BtnRemoveAll({ removeAll }: BtnRemoveAllProps): React.JSX.Element {
  
  const handleClick = (): void => {
    removeAll();
  };

  return (
    <button
      onClick={handleClick}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
    >
      Eliminar Todas
    </button>
  );
}
