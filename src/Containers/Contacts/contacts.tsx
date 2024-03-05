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
            <ul className='list-group d-flex flex-column align-items-center'>
                {contacts.map((contact) => (
                <li role="button" key={contact.id} onClick={() => handleClick(contact)} className='m-3 list-group-item w-50'>
                    <img src={contact.photo || 'No image'} alt={contact.name} style={{ width: '100px', height: '100px', marginRight: '10px',}} />
                    {contact.name}
                </li>
                ))}
            </ul>
            {isModalOpen && selectedContact && (
                <ContactModal contact={selectedContact} onClose={handleCloseModal} />
            )}
        </div>
    );
};
