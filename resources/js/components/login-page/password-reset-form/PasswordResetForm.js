import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { request_forgot_password } from '../../../actions/authentication/authentication-actions';

export default function PasswordResetForm() {
  const [form, setForm] = useState({
    email: '',
  });

  const dispatch = useDispatch();

  const handleChange = event =>
    setForm(form => ({
      ...form,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(request_forgot_password(form.email));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label htmlFor='email' className='form-label fw-bold'>
          Enter Email
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
      <button type='submit' className='btn btn-primary px-4'>
        Send
      </button>
      <Link to='/' type='submit' className='btn btn-danger px-4 ms-2'>
        Cancel
      </Link>
    </form>
  );
}
