import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authentication/authentication';
import { setUser } from '../../actions/user/user-actions';
import { removeExtraSpaces } from '../../utils/utility_functions';
import FormError from '../common/form-error/FormError';

function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [error, setError] = useState({ msg: '', show: false });

  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(form => ({
      ...form,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post('/login', {
        email: removeExtraSpaces(form.email),
        password: form.password,
        remember: form.remember,
      })
      .then(res => {
        dispatch(login());
        dispatch(setUser(res.data));
      })
      .catch(error => {
        const { data } = error.response;
        if (data.error) {
          showError(data.error);
          return;
        }
        if (data.errors.email) {
          showError(data.errors.email[0]);
        } else if (data.errors.password) {
          showError(data.errors.password[0]);
        }
      });
  };

  const showError = msg => {
    setError({
      msg,
      show: true,
    });
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
