import { useParams } from 'react-router';
import UserForm from '../form/UserForm';

function EditUser() {
  return (
    <div className='main__content main__content--edit-user'>
      <h1 className='fs-2 mb-5'>Edit User</h1>
      <div>
        <UserForm mode={'UPDATE'} />
      </div>
    </div>
  );
}

export default EditUser;
