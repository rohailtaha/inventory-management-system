import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment } from 'react/cjs/react.development';
import { login } from './actions/authentication/authentication';
import { setUser } from './actions/user/user-actions';
import Spinner from './components/common/spinner/Spinner';
import LoginPage from './components/login-page/LoginPage';
import MyApp from './MyApp';

function Gateway() {
  const [authInfoFetched, setAuthInfoFetched] = useState(false);

  const loggedin = useSelector(state => state.loggedin);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => document.body.removeAttribute('class'), 1000);
    axios
      .get('/login_status')
      .then(res => {
        setAuthInfoFetched(true);
        if (res.data.loggedin) {
          dispatch(login());
          dispatch(setUser(res.data));
        }
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <Fragment>
      {authInfoFetched ? !loggedin ? <LoginPage /> : <MyApp /> : <Spinner />}
    </Fragment>
  );
}

export default Gateway;
