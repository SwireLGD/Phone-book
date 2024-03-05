import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Contact } from '../../types';
import { addContact, deleteContact, editContact } from './contactThunks';

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