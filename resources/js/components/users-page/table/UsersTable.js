import { useSelector } from 'react-redux';
import User from './User';

function UsersTable() {
  const users = useSelector(state => state.users.list);

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Email</th>
          <th scope='col'>Phone</th>
          <th scope='col'>Status</th>
          <th scope='col'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <User
            id={user.id}
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
