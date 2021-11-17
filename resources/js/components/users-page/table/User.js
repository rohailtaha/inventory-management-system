import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { show_delete_confirmation } from '../../../actions/delete-confirmation/delete-confirmation-actions';

function User({ role, name, email, phone, status, id }) {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <tr>
        <td>{role}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>{status}</td>
        <td>
          <Link
            to={`/edit-user/${id}`}
            className='btn p-0 me-1'
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
    </Fragment>
  );
}

export default User;
