import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { addContact, editContact } from '../Contacts/contactsSlice';

interface ContactFormProps {
  contact?: {
    id: string;
    name: string;
    phone: string;
    email: string;
    photo: string;
  };
}

export const ContactForm: React.FC<ContactFormProps> = ({ contact = null }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setPhone(contact.phone);
      setEmail(contact.email);
      setPhoto(contact.photo);
    }
  }, [contact]);

  useEffect(() => {
    setPreview(photo);
  }, [photo]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newContact = { name, phone, email, photo };

    if (contact && contact.id) {
      await dispatch(editContact({ ...newContact, id: contact.id }));
    } else {
      await dispatch(addContact(newContact));
    }

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Photo URL:</label>
        <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} />
        {preview && <img src={preview} alt="Preview" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
      </div>
      <button type="submit">{contact ? 'Save Changes' : 'Add Contact'}</button>
      <button type="button" onClick={() => navigate('/')}>Back to contacts</button>
    </form>
  );
};
