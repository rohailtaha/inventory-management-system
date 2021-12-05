import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment } from 'react/cjs/react.development';
import { attempt_login } from './actions/authentication/authentication-actions';
import Spinner from './components/common/spinner/Spinner';
import SuccessModal from './components/common/success-modal/SuccessModal';
import MyApp from './MyApp';
import AuthenticationRouter from './routes/authentication-routes/AuthenticationRouter';

function Gateway() {
  const [authInfoFetched, setAuthInfoFetched] = useState(false);
  const [loggedin, loading, successMessage] = useSelector(state => [
    state.auth.loggedin,
    state.loading,
    state.successMessage,
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
      {authInfoFetched ? loggedin ? <MyApp /> : <AuthenticationRouter /> : null}
      {loading && <Spinner />}
      {successMessage.show && <SuccessModal msg={successMessage.text} />}
    </Fragment>
  );
}

export default Gateway;
