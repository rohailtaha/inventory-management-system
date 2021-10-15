import React from 'react';
import { Link } from 'react-router-dom';

function Supplier({ id, name, contact, address }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{contact}</td>
      <td>{address}</td>
      <td>
        <Link
          to={`/edit_supplier/${id}`}
          className='btn p-0'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='Edit'
        >
          <span className='material-icons'>edit</span>
        </Link>
        <button
          className='btn p-0'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='Delete'
        >
          <span className='material-icons text-danger'>delete</span>
        </button>
      </td>
    </tr>
  );
}

export default Supplier;
