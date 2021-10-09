import axios from 'axios';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { delete_user } from '../../../actions/users/users-actions';

function User({ name, email, phone, status, id }) {
  const dispatch = useDispatch();

  const remove = () => {
    dispatch(delete_user(id));
  };

  return (
    <Fragment>
      <tr>
        <td>{name}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>{status}</td>
        <td>
          <Link
            to={`/edit_user/${id}`}
            className='btn p-0 me-1'
            data-bs-toggle='tooltip'
            data-bs-placement='right'
            title='Edit'
          >
            <span className='material-icons'>edit</span>
          </Link>
          <button
            onClick={remove}
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
