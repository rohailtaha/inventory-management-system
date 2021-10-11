import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Fragment, useState } from 'react/cjs/react.development';
import {
  hide_success_message,
} from '../../../../actions/success-message.js/success-message-actions';
import {
  hide_error,
  request_create_user,
  request_update_user,
} from '../../../../actions/users/users-actions';
import FormError from '../../../common/form-error/FormError';
import SuccessModal from '../../../common/success-modal/SuccessModal';
import { removeExtraSpaces } from '../../../../utils/utility_functions';

function UserForm({ mode }) {
  const [form, setForm] = useState({
    name: '',
    password: '',
    email: '',
    phone: '',
    active: '1',
  });

  const dispatch = useDispatch();
  const { id } = useParams();
  const [successMessage, error, users] = useSelector(state => [
    state.successMessage,
    state.users.error,
    state.users.list,
  ]);

  useEffect(() => {
    if (updateMode()) {
      const user = getUser(id);
      setForm({
        name: user.name,
        password: '',
        email: user.email,
        phone: user.phone,
        active: user.active,
      });
    }
  }, []);

  useEffect(() => cleanup, []);
  useEffect(() => {
    if (successMessage.show && !updateMode()) resetForm();
  }, [successMessage.show]);

  const updateMode = () => mode === 'UPDATE';
  const getUser = id => users.find(user => user.id === parseInt(id));

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(form => ({
      ...form,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    updateMode()
      ? dispatch(request_update_user(dataWithCorrectFormat(), id))
      : dispatch(request_create_user(dataWithCorrectFormat()));
  };

  const resetForm = () => {
    setForm({
      name: '',
      password: '',
      email: '',
      phone: '',
      active: '1',
    });
  };

  const dataWithCorrectFormat = () => ({
    name: removeExtraSpaces(form.name),
    email: removeExtraSpaces(form.email),
    phone: removeExtraSpaces(form.phone),
    password: form.password,
    active: parseInt(form.active),
  });

  const cleanup = () => {
    dispatch(hide_error());
    dispatch(hide_success_message());
  };

  return (
    <Fragment>
      <form className='mt-4' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label fw-bold'>
            Name
          </label>
          <input
            type='text'
            className='form-control form-control-sm'
            id='name'
            onChange={handleChange}
            name='name'
            value={form.name}
            minLength='3'
            maxLength='255'
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label fw-bold'>
            Email
          </label>
          <input
            type='email'
            className='form-control form-control-sm'
            id='email'
            name='email'
            value={form.email}
            onChange={handleChange}
            required
            maxLength='255'
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
            placeholder='Minimum 5 characters long'
            {...(mode === 'CREATE' && { required: true })}
            minLength={mode === 'CREATE' ? '5' : '0'}
            maxLength='50'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='phone' className='form-label fw-bold'>
            Phone
          </label>
          <input
            type='tel'
            className='form-control form-control-sm'
            id='phone'
            onChange={handleChange}
            name='phone'
            value={form.phone}
            required
            minLength='4'
            maxLength='20'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='status' className='form-label fw-bold'>
            Status
          </label>
          <select
            className='form-select form-select-sm'
            id='status'
            name='status'
            value={form.status}
            onChange={handleChange}
            required
          >
            <option value='1'>Active</option>
            <option value='0'>Blocked</option>
          </select>
        </div>
        <div className='d-sm-flex mb-3'>
          <button
            type='submit'
            className='btn btn-primary flex-grow-1 mb-2 mb-sm-0'
          >
            {mode === 'CREATE' ? 'Add' : 'Update'} User
          </button>
          <Link to='/users' className='btn btn-danger flex-grow-1 ms-sm-3'>
            Cancel
          </Link>
        </div>
        {error.show && <FormError msg={error.msg} />}
      </form>
      {successMessage.show && <SuccessModal msg={successMessage.text} />}
    </Fragment>
  );
}

export default UserForm;
