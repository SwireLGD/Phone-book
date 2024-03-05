import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { addContact, editContact } from '../Contacts/contactThunks';

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
    <div className='container-fluid'>
      <h2>{contact ? 'Edit Contact' : 'Add New Contact'}</h2>
      <form onSubmit={handleSubmit} className='mt-2'>
        <div className='d-flex align-items-center mb-2'>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className='input-group-text ms-2' />
        </div>
        <div className='d-flex align-items-center mb-2'>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required className='input-group-text ms-2' />
        </div>
        <div className='d-flex align-items-center mb-2'>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className='input-group-text ms-2' />
        </div>
        <div className='mb-3'>
          <div className='d-flex align-items-center mb-2'>
            <label>Photo URL:</label>
            <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} className='input-group-text ms-2' />
          </div>
          <div style={{
            width: '200px',
            height: '200px',
            marginTop: '10px',
            border: '1px solid #ddd', 
            backgroundColor: '#f0f0f0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#ccc',
            fontSize: '16px',
            backgroundSize: 'cover',
            backgroundImage: preview ? `url(${preview})` : 'none'
          }}>
            {!preview && 'No Preview'}
          </div>
        </div>
          <button type="submit" className='btn btn-primary me-2'>{contact ? 'Save Changes' : 'Add Contact'}</button>
          <button type="button" onClick={() => navigate('/')} className='btn btn-success'>Back to contacts</button>
      </form>
    </div>
  );
};
