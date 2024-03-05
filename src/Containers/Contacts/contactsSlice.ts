import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Contact } from '../../types';

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: [],
};

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
  

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        const index = state.contacts.findIndex(contact => contact.id === action.payload);
        if (index !== -1) {
          state.contacts.splice(index, 1);
        }
      })
      .addCase(editContact.fulfilled, (state, action) => {
        const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
      });
  },
});

export default contactsSlice.reducer;