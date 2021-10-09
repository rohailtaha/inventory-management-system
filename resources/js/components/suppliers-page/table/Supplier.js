import React from 'react';
import { Link } from 'react-router-dom';

function Supplier({ name, contact, address }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{contact}</td>
      <td>{address}</td>
      <td>
        <Link
          to='/edit_supplier'
          className='btn btn-secondary btn-sm me-2 p-1'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='Edit'
        >
          <i className='fas fa-edit action-icon fw-lighter'></i>
        </Link>
        <button
          className='btn btn-danger btn-sm p-1'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='Delete'
        >
          <i className='fas fa-trash-alt action-icon fw-lighter'></i>
        </button>
      </td>
    </tr>
  );
}

export default Supplier;
