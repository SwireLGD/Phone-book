import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from '../Containers/Contacts/contactsSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;