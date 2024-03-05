import { Route, Routes } from 'react-router-dom';
import { ContactForm } from './Containers/AddContact/ContactForm';
import { ContactsList } from './Containers/Contacts/contacts';

const App = () => {

  return (
    <>
      <header></header>
      <main>
      <Routes>
        <Route path="/" element={<ContactsList />} />
        <Route path="/add" element={<ContactForm />} />
        <Route path="/edit/:id" element={<ContactForm />} />
      </Routes>
      </main>
    </>
  );
};

export default App;