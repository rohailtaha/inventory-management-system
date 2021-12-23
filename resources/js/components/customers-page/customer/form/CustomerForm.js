import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import {
  hide_error,
  request_create_customer,
  request_update_customer,
} from '../../../../actions/customers/customers-actions';
import { hide_success_message } from '../../../../actions/success-message/success-message-actions';
import { removeExtraSpaces } from '../../../../utils/utility_functions';
import FormError from '../../../common/form-error/FormError';
import withCleaner from '../../../hocs/withCleaner';

function CustomerForm({ mode }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const dispatch = useDispatch();
  const [successMessage, error, customers] = useSelector(state => [
    state.successMessage,
    state.customers.error,
    state.customers.list,
  ]);

  useEffect(() => {
    if (updateMode()) {
      const customer = getCustomer(id);
      setForm({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
      });
    }
  }, []);

  useEffect(() => {
    if (successMessage.show && !updateMode()) resetForm();
  }, [successMessage.show]);

  const { id } = useParams();

  const updateMode = () => mode === 'UPDATE';
  const getCustomer = id =>
    customers.find(customer => customer.id === parseInt(id));

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
      ? dispatch(request_update_customer(dataWithCorrectFormat(), id))
      : dispatch(request_create_customer(dataWithCorrectFormat()));
  };

  const dataWithCorrectFormat = () => {
    return {
      name: removeExtraSpaces(form.name),
      email: removeExtraSpaces(form.email),
      phone: removeExtraSpaces(form.phone),
      address: removeExtraSpaces(form.address),
    };
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      address: '',
    });
  };

  return (
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
          required
          maxLength='255'
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
          maxLength='255'
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
          maxLength='255'
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='address' className='form-label fw-bold'>
          Address
        </label>
        <input
          type='text'
          className='form-control form-control-sm'
          id='address'
          name='address'
          value={form.address}
          onChange={handleChange}
          required
          maxLength='255'
        />
      </div>

      <div className='d-sm-flex mb-3'>
        <button
          type='submit'
          className='btn btn-primary flex-grow-1 mb-2 mb-sm-0'
        >
          {updateMode() ? 'Update' : 'Add'}
        </button>
        <Link to='/customers' className='btn btn-danger flex-grow-1 ms-sm-3'>
          Cancel
        </Link>
      </div>
      {error.show && <FormError msg={error.msg} />}
    </form>
  );
}

export default withCleaner(CustomerForm, [hide_error, hide_success_message]);
