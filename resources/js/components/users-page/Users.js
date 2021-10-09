import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  delete_user,
  setAreUsersFetched,
  setUsers,
} from '../../actions/users/users-actions';
import ConfirmationModal from '../common/confirmation-modal/ConfirmationModal';
import UsersTable from './table/UsersTable';

function Users() {
  const dispatch = useDispatch();
  const [fetched, confirmation] = useSelector(state => [
    state.users.fetched,
    state.confirmation,
  ]);


  useEffect(() => {
    if (!fetched) {
      axios
        .get('/api/users')
        .then(res => {
          dispatch(setUsers(res.data.users));
          dispatch(setAreUsersFetched(true));
        })
        .catch(error => console.log(error));
    }
  }, []);

  return (
    <div className='main__content main__content--users'>
      <Link className='btn btn-primary me-5 px-3 py-2' to='/add_user'>
        <i className='fas fa-plus me-2'></i> New User
      </Link>

      <section className='mt-5'>
        <div className='card'>
          <div className='card-header fs-2'>Users</div>
          <div className='card-body'>
            <div className='table-responsive'>
              <UsersTable />
            </div>
          </div>
        </div>
      </section>
      {confirmation.show && (
        <ConfirmationModal msg={confirmation.message} cb={remove} />
      )}
    </div>
  );
}

export default Users;
