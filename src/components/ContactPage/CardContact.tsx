import { Edit, Mail, PhoneIcon, Trash2, UserCircle } from "lucide-react";
import { TypeContact } from "../../types/types";
import useCardContact from "../../hooks/Contacts/useCardContact";

interface CardContactProps {
  contact: TypeContact;
  getContacts: () => Promise<void>;
}

function CardContact({ contact, getContacts }: CardContactProps) {
  const { handleEditContact, handleDeleteContact } = useCardContact({ getContacts });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
          {contact.image ? (
            <img
              src={contact.image}
              alt={contact.name}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <UserCircle className="h-8 w-8" />
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {contact.name}
          </h3>
          {contact.email && (
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
              <Mail className="h-3 w-3 mr-1" /> {contact.email}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-1">
        {contact.phones.map((phone, index) => (
          <p key={index} className="text-sm text-gray-600 dark:text-gray-300  flex items-center">
            <PhoneIcon className="h-3 w-3 mr-1" /> {phone}
          </p>
        ))}
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleEditContact(contact);
          }}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={() => handleDeleteContact(contact.id)}
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default CardContact;
