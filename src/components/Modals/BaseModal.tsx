import { X } from "lucide-react";

interface BaseModalProps {
  title: string;
  closeModal: () => void;
  children: React.ReactNode;
  maxHeightAndOverflowY?: boolean
}

function BaseModal({ title, closeModal, children, maxHeightAndOverflowY }: BaseModalProps) {
  const handleClick = (): void => {
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`bg-white dark:bg-gray-800  rounded-lg p-6 w-full max-w-md ${maxHeightAndOverflowY ? "" : "max-h-screen overflow-y-auto"}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button
            onClick={handleClick}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

export default BaseModal;
