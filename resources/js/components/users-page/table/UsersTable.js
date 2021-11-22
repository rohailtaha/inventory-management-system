import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resort_users, sort_users } from '../../../actions/users/users-actions';
import SortArrows from '../../common/sort-arrows/SortArrows';
import User from './User';

function UsersTable() {
  const [users, pagination] = useSelector(state => [
    state.users.list,
    state.pagination,
  ]);

  const dispatch = useDispatch();

  const itemsForCurrentPage = () =>
    users.slice(
      initialItemIndexForCurrentPage(),
      initialItemIndexForCurrentPage() + pagination.itemsPerPage
    );

  const initialItemIndexForCurrentPage = () =>
    (pagination.currentPage - 1) * pagination.itemsPerPage;

  const sort = (key, order) => dispatch(sort_users(key, order));

  useEffect(() => cleanup, []);

  const cleanup = () => dispatch(resort_users());

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>
            Role
            <SortArrows aKey='role' sort={sort} />
          </th>
          <th scope='col'>
            Name <SortArrows aKey='name' sort={sort} />
          </th>
          <th scope='col'>
            Email <SortArrows aKey='email' sort={sort} />
          </th>
          <th scope='col'>
            Phone <SortArrows aKey='phone' sort={sort} />
          </th>
          <th scope='col'>
            Status <SortArrows aKey='status' sort={sort} />
          </th>
          <th scope='col'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {itemsForCurrentPage().map(user => (
          <User
            id={user.id}
            role={user.role}
            name={user.name}
            email={user.email}
            phone={user.phone}
            status={user.status}
            key={user.id}
          />
        ))}
      </tbody>
    </table>
  );
}

export default UsersTable;
