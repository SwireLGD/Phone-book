import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchContacts } from './contactsSlice';
import { ContactModal } from './contactModal';
import { Contact } from '../../types';

export const ContactsList = () => {
    const dispatch = useAppDispatch();
    const contacts = useAppSelector((state) => state.contacts.contacts);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const handleClick = (contact: Contact) => { 
        setSelectedContact(contact);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedContact(null);
    };

    return (
        <div>
            <ul>
                {contacts.map((contact) => (
                <li key={contact.id} onClick={() => handleClick(contact)}>
                    {contact.name} - {contact.phone} - {contact.email}
                </li>
                ))}
            </ul>
            {isModalOpen && selectedContact && (
                <ContactModal contact={selectedContact} onClose={handleCloseModal} />
            )}
        </div>
    );
};
