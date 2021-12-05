import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../utils/util_structures';

function Header() {
  const [shop] = useSelector(state => [state.shop]);

  return (
    <header className='bg-primary text-white py-2 d-flex justify-content-between header relative-container'>
      <Link className='ms-3 navbar-brand text-light logo' to='/'>
        {APP_NAME}
      </Link>
      <div className='me-3 store-info'>
        <div>
          <span>Contact: </span>
          <span>{shop.contact}</span>
        </div>
        <span>Address: </span>
        <span>{shop.address}</span>
        <div></div>
      </div>
    </header>
  );
}

export default Header;
