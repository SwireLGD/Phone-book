import { NavLink } from 'react-router-dom';
import "./Header.css";

const Header = () => {
  return (
    <div className='bg-primary d-flex justify-content-between container-fluid'>
      <h1 className='Home'><NavLink to="/">Contacts</NavLink></h1>
      <button type='button' className='btn btn-primary'><NavLink to='/add' className={'text-light text-decoration-none'}>Add contact</NavLink></button>
    </div>
  );
};

export default Header;