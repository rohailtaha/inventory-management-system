import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { hide_delete_confirmation } from '../../actions/delete-confirmation/delete-confirmation-actions';
import { reset_pagination } from '../../actions/pagination/pagination-actions';
import { hide_success_message } from '../../actions/success-message/success-message-actions';
import {
  fetch_users,
  request_delete_user,
} from '../../actions/users/users-actions';
import Paginaton from '../common/pagination/Pagination';
import UsersTable from './table/UsersTable';

function Users() {
  const dispatch = useDispatch();
  const [fetched, deleteConfirmation, users] = useSelector(state => [
    state.users.fetched,
    state.deleteConfirmation,
    state.users.list,
  ]);

  useEffect(() => {
    if (!fetched) dispatch(fetch_users());
  }, []);

  useEffect(() => {
    if (deleteConfirmation.confirm)
      dispatch(request_delete_user(deleteConfirmation.deleteID));
  }, [deleteConfirmation.confirm]);

  useEffect(() => cleanup, []);

  const cleanup = () => {
    dispatch(hide_success_message());
    dispatch(hide_delete_confirmation());
    dispatch(reset_pagination());
  };

  return (
    <div className='main__content main__content--users'>
      <Link
        className='btn btn-primary me-5 px-3 py-2 d-flex align-items-center add-btn'
        to='/add-user'
      >
        <span className='material-icons me-1'> add </span>{' '}
        <span> New User </span>
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
        {fetched && <Paginaton totalItems={users.length} />}
      </section>
    </div>
  );
}

export default Users;
