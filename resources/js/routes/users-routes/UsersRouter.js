import { Fragment } from 'react';
import Users from '../../components/users-page/Users';
import AddUser from '../../components/users-page/user/add user/AddUser';
import EditUser from '../../components/users-page/user/edit user/EditUser';
import { Route } from 'react-router';

function UsersRouter() {
  return (
    <Fragment>
      <Route path='/users'>
        <Users />
      </Route>
      <Route path='/add-user'>
        <AddUser />
      </Route>
      <Route path='/edit-user/:id'>
        <EditUser />
      </Route>
    </Fragment>
  );
}

export default UsersRouter;
