import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import ForgotPasswordPage from '../../components/forgot-password-page/ForgotPasswordPage';
import LoginPage from '../../components/login-page/LoginPage';

export default function AuthenticationRouter() {
  return (
    <Router>
      <Route path='/' exact>
        <LoginPage />
      </Route>
      <Route path='/forgot-password' exact>
        <ForgotPasswordPage />
      </Route>
    </Router>
  );
}
