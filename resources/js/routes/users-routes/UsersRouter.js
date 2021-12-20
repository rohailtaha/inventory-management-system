import { Fragment } from 'react';
import Users from '../../components/users-page/Users';
import AddUser from '../../components/users-page/user/add user/AddUser';
import EditUser from '../../components/users-page/user/edit user/EditUser';
import { Route } from 'react-router';
import useUsers from '../../hooks/useUsers';

function UsersRouter() {
  const [, fetched] = useUsers();

  const fetchedRequiredResources = () => fetched;

  return (
    <Fragment>
      {fetchedRequiredResources() && (
        <Fragment>
          <Route path='/users' exact>
            <Users />
          </Route>
          <Route path='/users/add' exact>
            <AddUser />
          </Route>
          <Route path='/users/:id/edit' exact>
            <EditUser />
          </Route>
        </Fragment>
      )}
    </Fragment>
  );
}

export default UsersRouter;
