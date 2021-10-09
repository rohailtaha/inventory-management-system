import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='bg-primary text-white py-2 d-flex justify-content-between header relative-container'>
      <Link className='ms-3 navbar-brand text-light logo' to='/'>
        My Store
      </Link>
      <div className='me-3'>
        <div>
          <span>Contact: </span>
          <span>03090100461</span>
        </div>
        <span>Address: </span>
        <span>Street 5A, H-12 sector, Lahore</span>
        <div></div>
      </div>
    </header>
  );
}

export default Header;
