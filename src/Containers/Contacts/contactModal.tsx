import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { deleteContact } from './contactsSlice';
import { useNavigate } from 'react-router-dom';

interface ContactModalProps {
  contact: {
    id: string;
    name: string;
    phone: string;
    email: string;
    photo: string;
  };
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ contact, onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
    onClose(); 
  };

  const handleEdit = () => {
    navigate(`/edit/${contact.id}`);
    onClose();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <img src={contact.photo} alt={contact.name} style={{ width: '100px', height: '100px' }} />
        <h2>{contact.name}</h2>
        <p>Phone: {contact.phone}</p>
        <p>Email: {contact.email}</p>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
        <span className="close" onClick={onClose}>&times;</span>
      </div>
    </div>
  );
};
