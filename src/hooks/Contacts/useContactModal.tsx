import { useEffect, useState } from 'react'
import useApp from '../useApp';
import { invoke } from '@tauri-apps/api/core';

type Contact = { name: string, image: string | null, email: string, phones: string[] }

type ContactError = {
  name: string
  email: string
  phone: string
}

interface useContactModalProps {
  getContacts: () => Promise<void>
}

function useContactModal({ getContacts }: useContactModalProps) {
  const [contactForm, setContactForm] = useState<Contact>({ name: '', image: null, email: '', phones: [''] });
  const [contactFormErrors, setContactFormErrors] = useState<ContactError>({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (!!contactFormErrors) {
      setContactFormErrors({ name: "", email: "", phone: "" })
      console.log("Hay errores")
    }
    
  }, [contactForm])

  const assignImage = (image: string) => {
    setContactForm({ ...contactForm, image });
  }

  const updatePhone = (index: number, value: string) => {
    const newPhones = [...contactForm.phones];
    newPhones[index] = value;
    setContactForm({ ...contactForm, phones: newPhones });
  };

  const addPhoneField = () => {
    setContactForm({ ...contactForm, phones: [...contactForm.phones, ''] });
  };

  const { changeEditingContact, changeShowContactModal, editingContact, idUser, changeShowErrorModal, setError } = useApp()

  useEffect(() => {
    if (editingContact) setContactForm(editingContact)
  }, [editingContact])

  const isEditing = editingContact && true

  const closeModal = (): void => {
    changeEditingContact(null);
    changeShowContactModal(false);
    setContactForm({ name: "", image: null, email: "", phones: [""] });
    setContactFormErrors({ name: "", email: "", phone: "" });
  };

  const removePhoneField = (index: number) => {
    if (contactForm.phones.length > 1) {
      const newPhones = contactForm.phones.filter((_, i) => i !== index);
      setContactForm({ ...contactForm, phones: newPhones });
    }
  };

  const validationContactForm = () => {
    const errors: ContactError = { name: "", email: "", phone: ""};
    if (!contactForm.name.trim()) {
      errors.name = 'El nombre es obligatorio';
    }
    if (contactForm.email && contactForm.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      errors.email = 'Correo electrónico inválido';
    }
    if (contactForm.phones.some(phone => phone && !/^\+?[\d\s\-\(\)]+$/.test(phone))) {
      errors.phone = 'Número de teléfono inválido';
    }

    const validation = !!errors.name.trim() || !!errors.email.trim() || !!errors.phone.trim()
    
    if (validation) setContactFormErrors(errors);

    return validation
  }


  const handleAddContact = async () => {

    if (validationContactForm()) return

    const { name, email, phones } = contactForm
    
    if (isEditing) {
      const idContact = editingContact.id

      await invoke("update_contact", { idContact, name, email, phones })
        .then()
        .catch((error) => {
          changeShowErrorModal(true)
          setError({ message: error })
        })
    } else {

      await invoke("insert_contact", { idUser, name, email, phones })
        .then()
        .catch((error) => {
          changeShowErrorModal(true)
          setError({ message: error })
        })
    }

    changeShowContactModal(false);
    setContactForm({ name: '', image: null, email: '', phones: [''] });
    setContactFormErrors({ name: "", email: "", phone: "" });

    await getContacts()
  };

  // const handleAddContact = async () => {
  //   if (contactForm.name && contactForm.phones[0]) {
  //     if (isEditing) {
  //       const idContact = editingContact.id
  //       const { name, email, phones } = contactForm

  //       await invoke("update_contact", { idContact, name, email, phones })
  //         .then()
  //         .catch((error) => {
  //           console.error(error)
  //         })
  //     } else {
  //       const { name, email, phones } = contactForm

  //       await invoke("insert_contact", { idUser, name, email, phones })
  //         .then()
  //         .catch((error) => {
  //           console.error(error)
  //         })
  //     }
  //     changeShowContactModal(false);
  //     setContactForm({ name: '', image: null, email: '', phones: [''] });

  //     await getContacts()
  //   }
  // };

  return {
    contactForm, 
    setContactForm,
    closeModal,
    isEditing,
    assignImage,
    updatePhone,
    addPhoneField,
    handleAddContact,
    contactFormErrors, 
    removePhoneField
  }
}

export default useContactModal