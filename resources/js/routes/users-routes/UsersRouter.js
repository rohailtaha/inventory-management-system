import { Fragment } from 'react';
import Users from '../../components/users-page/Users';
import AddUser from '../../components/users-page/user/add user/AddUser';
import EditUser from '../../components/users-page/user/edit user/EditUser';
import { Route } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetch_users } from '../../actions/users/users-actions';

function UsersRouter() {
  const [fetched] = useSelector(state => [state.users.fetched]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) dispatch(fetch_users());
  }, []);

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
