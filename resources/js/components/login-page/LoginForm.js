import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import { request_login } from '../../actions/authentication/authentication-actions';
import { hide_error } from '../../actions/authentication/authentication-actions';
import { removeExtraSpaces } from '../../utils/utility_functions';
import FormError from '../common/form-error/FormError';

export default function LoginForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const rememberRef = useRef();

  const toggleRemember = () => {
    rememberRef.current.hasAttribute('checked')
      ? rememberRef.current.removeAttribute('checked')
      : rememberRef.current.setAttribute('checked', 'true');
  };

  const [error] = useSelector(state => [state.auth.error]);
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
    dispatch(request_login(dataWithCorrectFormat()));
  };

  const dataWithCorrectFormat = () => ({
    email: removeExtraSpaces(form.email),
    password: form.password,
    remember: rememberRef.current.hasAttribute('checked'),
  });

  useEffect(() => cleanup, []);
  const cleanup = () => dispatch(hide_error());

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label htmlFor='email' className='form-label fw-bold'>
          Email
        </label>
        <input
          type='email'
          className='form-control form-control-sm'
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
          className='form-control form-control-sm'
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
          name='remember'
          ref={rememberRef}
          onClick={toggleRemember}
        />
        <label className='form-check-label' htmlFor='remember'>
          Remember
        </label>
      </div>
      <button type='submit' className='btn btn-primary px-4'>
        Login
      </button>
      <Link
        to='/forgot-password'
        className='forgot-password ms-auto text-secondary mb-3 d-block text-decoration-underline fw-bold'
      >
        {' '}
        Forgot Password?{' '}
      </Link>
      {error.show && <FormError msg={error.msg} />}
    </form>
  );
}
