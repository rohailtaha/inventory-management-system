import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Fragment } from 'react/cjs/react.development';
import { attempt_login, login } from './actions/authentication/authentication';
import Spinner from './components/common/spinner/Spinner';
import LoginPage from './components/login-page/LoginPage';
import MyApp from './MyApp';

function Gateway() {
  const [authInfoFetched, setAuthInfoFetched] = useState(false);
  const loading = useSelector(state => state.loading);

  const loggedin = useSelector(state => state.loggedin);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // setTimeout(() => document.body.removeAttribute('class'), 1000);
    dispatch(attempt_login()).then(res => {
      setAuthInfoFetched(true);
    });
  }, []);

  return (
    <Fragment>
      {authInfoFetched ? loggedin ? <MyApp /> : <LoginPage /> : null}
      {loading && <Spinner />}
    </Fragment>
  );
}

export default Gateway;
