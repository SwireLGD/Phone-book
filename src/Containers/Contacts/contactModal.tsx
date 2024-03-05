import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import './contactModal.css';
import { deleteContact } from './contactThunks';

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
    <div className="contactModal" onClick={onClose}>
      <div className="modalContent" onClick={e => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <div className='modalContentInner'>
          <img src={contact.photo} alt={contact.name} style={{ width: '100px', height: '100px' }} className='me-5' />
          <div>
            <h2>{contact.name}</h2>
            <p>Phone: {contact.phone}</p>
            <p>Email: {contact.email}</p>
          </div>
        </div>
        <button onClick={handleEdit} className='btn btn-primary me-2'>Edit</button>
        <button onClick={handleDelete} className='btn btn-danger'>Delete</button>
      </div>
    </div>
  );
};
