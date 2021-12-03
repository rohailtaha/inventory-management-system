import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router } from 'react-router';
import { Fragment } from 'react/cjs/react.development';
import { attempt_login } from './actions/authentication/authentication-actions';
import Spinner from './components/common/spinner/Spinner';
import LoginPage from './components/login-page/LoginPage';
import MyApp from './MyApp';

function Gateway() {
  const [authInfoFetched, setAuthInfoFetched] = useState(false);
  const [loggedin, loading] = useSelector(state => [
    state.loggedin,
    state.loading,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    // setTimeout(() => document.body.removeAttribute('class'), 1000);
    dispatch(attempt_login()).then(() => {
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
