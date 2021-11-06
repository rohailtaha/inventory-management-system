import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { show_delete_confirmation } from '../../../actions/delete-confirmation/delete-confirmation-actions';

function Supplier({ id, name, email, contact, address }) {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{contact}</td>
      <td>{address}</td>
      <td>
        <Link
          to={`/edit-supplier/${id}`}
          className='btn p-0'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='Edit'
        >
          <span className='material-icons'>edit</span>
        </Link>
        <button
          onClick={() => dispatch(show_delete_confirmation(id))}
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
