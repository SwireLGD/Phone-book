import { Route, Routes } from 'react-router-dom';
import { ContactForm } from './Containers/AddContact/ContactForm';
import { ContactsList } from './Containers/Contacts/contacts';
import Header from './Components/Header/Header';
import PageNotFound from './Containers/PageNotFound/PageNotFound';

const App = () => {

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
      <Routes>
        <Route path="/" element={<ContactsList />} />
        <Route path="/add" element={<ContactForm />} />
        <Route path="/edit/:id" element={<ContactForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </main>
    </>
  );
};

export default App;