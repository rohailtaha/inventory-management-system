import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetch_users,
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
      dispatch(fetch_users());
    }
  }, []);

  return (
    <div className='main__content main__content--users'>
      <Link
        className='btn btn-primary me-5 px-3 py-2 d-flex align-items-center add-btn '
        to='/add_user'
      >
        <span className='material-icons me-1'> add </span>{' '}
        <span> Add New User </span>
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
