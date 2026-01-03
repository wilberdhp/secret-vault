import useContactModal from "../../hooks/Contacts/useContactModal";
import ImageUpload from "../ImageUpload";
import BaseModal from "./BaseModal";
import { Plus, UserCircle, X } from "lucide-react";

interface ContactModalProps {
  getContacts: () => Promise<void>
}

function ContactModal({ getContacts }: ContactModalProps) {
  const { contactForm, setContactForm, closeModal, isEditing, assignImage, updatePhone, addPhoneField, handleAddContact, contactFormErrors, removePhoneField } = useContactModal({ getContacts })

  return (
    <BaseModal
      closeModal={closeModal}
      title={isEditing ? "Editar Contacto" : "Agregar Contacto"}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Imagen
        </label>
        <div className="flex items-center space-x-4">
          {contactForm.image ? (
            <img
              src={contactForm.image}
              alt="Preview"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <UserCircle className="h-8 w-8 text-gray-400" />
            </div>
          )}
          <ImageUpload 
            assignImage={assignImage}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nombre
        </label>
        <input
          type="text"
          value={contactForm.name}
          onChange={(e) =>
            setContactForm({ ...contactForm, name: e.target.value })
          }
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    contactFormErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          placeholder="Nombre completo"
        />
        {contactFormErrors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{contactFormErrors.name}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email (opcional)
        </label>
        <input
          type="email"
          value={contactForm.email}
          onChange={(e) =>
            setContactForm({ ...contactForm, email: e.target.value })
          }
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            contactFormErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          placeholder="correo@ejemplo.com"
        />
        {contactFormErrors.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{contactFormErrors.email}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Teléfonos
        </label>
        {contactForm.phones.map((phone, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="tel"
              value={phone}
              onChange={(e) => updatePhone(index, e.target.value)}
              className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                contactFormErrors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              placeholder="Número de teléfono"
            />
            {contactForm.phones.length > 1 && (
              <button
                type="button"
                onClick={() => removePhoneField(index)}
                className="ml-2 p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addPhoneField}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center"
        >
          <Plus className="h-4 w-4 mr-1" />
          Agregar otro teléfono
        </button>
        {contactFormErrors.phone && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{contactFormErrors.phone}</p>
        )}
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          onClick={handleAddContact}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isEditing ? "Actualizar" : "Guardar"}
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

export default ContactModal;
