import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from './password-reset-form/login-form/LoginForm';
import PasswordResetForm from './password-reset-form/PasswordResetForm';

function LoginPage() {
  return (
    <Router>
      <div className='main--login'>
        <div className='main__content'>
          <h1 className='mb-4'> Login </h1>
          <LoginForm />
          {/* <PasswordResetForm /> */}
        </div>
      </div>
    </Router>
  );
}

export default LoginPage;
