import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Fragment, useState } from 'react/cjs/react.development';
import { hideError, showError } from '../../../../actions/errors/error-actions';
import { load, stopLoading } from '../../../../actions/load/load';
import { show_success_message } from '../../../../actions/success-message.js/success-message-actions';
import { add_user, update_user } from '../../../../actions/users/users-actions';
import FormError from '../../../common/form-error/FormError';
import Spinner from '../../../common/spinner/Spinner';
import SuccessModal from '../../../common/success-modal/SuccessModal';

function UserForm({ mode }) {
  const [form, setForm] = useState({
    name: '',
    password: '',
    email: '',
    phone: '',
    status: 'Active',
  });

  const dispatch = useDispatch();
  const { id } = useParams();
  const [successMessage, error, loading, users] = useSelector(state => [
    state.successMessage,
    state.error,
    state.loading,
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
        status: user.status,
      });
    }
  }, []);

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
    dispatch(load());
    const request = updateMode() ? updateUser() : createUser();
    request
      .then(res => {
        dispatch(stopLoading());
        dispatch(hideError());
        dispatch(show_success_message('User Saved Sussessfully!'));
        if (!updateMode()) {
          resetForm();
          dispatch(add_user(res.data.user));
        } else {
          dispatch(update_user(res.data.user));
        }
      })
      .catch(error => {
        dispatch(stopLoading());
        const { data } = error.response;
        if (data.errors.name) {
          dispatch(showError(data.errors.name[0]));
        } else if (data.errors.email) {
          dispatch(showError(data.errors.email[0]));
        } else if (data.errors.password) {
          dispatch(showError(data.errors.password[0]));
        } else if (data.errors.phone) {
          dispatch(showError(data.errors.phone[0]));
        } else if (data.errors.active) {
          dispatch(showError(data.errors.active[0]));
        }
      });
  };

  const updateUser = () => {
    const { name, password, email, phone, status } = form;
    return axios.put(`/api/users/${id}`, {
      name,
      email,
      phone,
      password,
      active: status === 'Active' ? 1 : 0,
    });
  };

  const createUser = () => {
    const { name, password, email, phone, status } = form;
    return axios.post('/api/users', {
      name,
      email,
      phone,
      password,
      active: status === 'Active' ? 1 : 0,
    });
  };

  const resetForm = () => {
    setForm({
      name: '',
      password: '',
      email: '',
      phone: '',
      status: 'Active',
      error: false,
    });
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
            <option value='Active'>Active</option>
            <option value='Blocked'>Blocked</option>
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
      {loading && <Spinner />}
    </Fragment>
  );
}

export default UserForm;
