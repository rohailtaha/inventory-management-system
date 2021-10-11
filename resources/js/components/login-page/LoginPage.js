import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react/cjs/react.development';
import { request_login } from '../../actions/authentication/authentication';
import { hide_error } from '../../actions/users/users-actions';
import { removeExtraSpaces } from '../../utils/utility_functions';
import FormError from '../common/form-error/FormError';

function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const [loading, error] = useSelector(state => [
    state.loading,
    state.users.error,
  ]);
  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(form => ({
      ...form,
      [name]: value,
    }));
  };

  useEffect(() => {
    return cleanup;
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(request_login(dataWithCorrectFormat()));
  };

  const dataWithCorrectFormat = () => ({
    email: removeExtraSpaces(form.email),
    password: form.password,
    remember: form.remember,
  });

  const cleanup = () => {
    dispatch(hide_error());
  };

  return (
    <div className='main--login'>
      <div className='main__content'>
        <h1 className='mb-4'> Login </h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label fw-bold'>
              Email
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              required
              maxLength='255'
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label fw-bold'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={form.password}
              onChange={handleChange}
              required
              minLength='5'
              maxLength='50'
              placeholder='Minimum 5 characters long'
            />
          </div>
          <div className='mb-3 form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='remember'
              name='remeber'
              value={form.remember}
              onChange={handleChange}
            />
            <label className='form-check-label' htmlFor='remember'>
              Remember
            </label>
          </div>
          <button type='submit' className='btn btn-primary px-4 mb-3'>
            Login
          </button>
          {error.show && <FormError msg={error.msg} />}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
