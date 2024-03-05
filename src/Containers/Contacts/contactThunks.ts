import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Contact } from '../../types';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await axiosApi.get('/contacts.json');
  const contacts = response.data ? Object.keys(response.data).map(key => ({
    id: key,
    ...response.data[key]
  })) : [];
  return contacts;
});

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact: Omit<Contact, 'id'>) => {
    const response = await axiosApi.post('/contacts.json', contact);
    return { ...contact, id: response.data.name };
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId: string) => {
    await axiosApi.delete(`/contacts/${contactId}.json`);
    return contactId;
  }
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async ({ id, ...contact }: Contact) => {
    await axiosApi.put(`/contacts/${id}.json`, contact);
    return { id, ...contact };
  }
);