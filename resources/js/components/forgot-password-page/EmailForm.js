import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import {
  hide_error,
  request_forgot_password,
} from '../../actions/authentication/authentication-actions';
import FormError from '../common/form-error/FormError';
import withCleaner from '../hocs/withCleaner';

function EmailForm() {
  const [error, successMessage] = useSelector(state => [
    state.auth.error,
    state.successMessage,
  ]);

  const [form, setForm] = useState({
    email: '',
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = event =>
    setForm(form => ({
      ...form,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(request_forgot_password(form.email));
  };

  useEffect(() => {
    if (successMessage.show) {
      resetForm();
      history.push('/');
    }
  }, [successMessage.show]);

  const resetForm = () =>
    setForm({
      email: '',
    });

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
      <div className='mb-3'>
        <button type='submit' className='btn btn-primary px-4'>
          Submit
        </button>
        <Link to='/' type='submit' className='btn btn-danger px-4 ms-2'>
          Cancel
        </Link>
      </div>
      {error.show && <FormError msg={error.msg} />}
    </form>
  );
}

export default withCleaner(EmailForm, [hide_error]);
