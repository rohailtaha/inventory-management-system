import UserForm from "../form/UserForm";

function AddUser() {

  return (
    <div className='main__content main__content--add-user'>
      <h1 className='fs-2 mb-5'>Add New User</h1>
      <div>
        <UserForm mode={'CREATE'} />
      </div>
    </div>
  );
}

export default AddUser;
