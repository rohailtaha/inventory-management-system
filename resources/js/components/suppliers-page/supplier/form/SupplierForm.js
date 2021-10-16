import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Fragment, useState } from 'react/cjs/react.development';
import { hide_success_message } from '../../../../actions/success-message.js/success-message-actions';
import {
  hide_error,
  request_create_supplier,
  request_update_supplier,
} from '../../../../actions/suppliers/suppliers-actions';
import { removeExtraSpaces } from '../../../../utils/utility_functions';
import FormError from '../../../common/form-error/FormError';
import SuccessModal from '../../../common/success-modal/SuccessModal';

function SupplierForm({ mode }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
  });

  const dispatch = useDispatch();
  const [successMessage, error, suppliers] = useSelector(state => [
    state.successMessage,
    state.suppliers.error,
    state.suppliers.list,
  ]);

  useEffect(() => {
    if (updateMode()) {
      const supplier = getSupplier(id);
      setForm({
        name: supplier.name,
        email: supplier.email,
        contact: supplier.contact,
        address: supplier.address,
      });
    }
  }, []);

  useEffect(() => cleanup, []);
  useEffect(() => {
    if (successMessage.show && !updateMode()) resetForm();
  }, [successMessage.show]);

  const { id } = useParams();

  const updateMode = () => mode === 'UPDATE';
  const getSupplier = id =>
    suppliers.find(supplier => supplier.id === parseInt(id));

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
      ? dispatch(request_update_supplier(dataWithCorrectFormat(), id))
      : dispatch(request_create_supplier(dataWithCorrectFormat()));
  };

  const cleanup = () => {
    dispatch(hide_error());
    dispatch(hide_success_message());
  };

  const dataWithCorrectFormat = () => {
    return {
      name: removeExtraSpaces(form.name),
      email: removeExtraSpaces(form.email),
      contact: removeExtraSpaces(form.contact),
      address: removeExtraSpaces(form.address),
    };
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      contact: '',
      address: '',
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
            name='name'
            value={form.name}
            onChange={handleChange}
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
          <label htmlFor='contact' className='form-label fw-bold'>
            Contact
          </label>
          <input
            type='tel'
            className='form-control form-control-sm'
            id='contact'
            name='contact'
            value={form.contact}
            onChange={handleChange}
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
            {updateMode() ? 'Update' : 'Add '}
          </button>
          <Link to='/suppliers' className='btn btn-danger flex-grow-1 ms-sm-3'>
            Cancel
          </Link>
        </div>
        {error.show && <FormError msg={error.msg} />}
      </form>
      {successMessage.show && <SuccessModal msg={successMessage.text} />}
    </Fragment>
  );
}

export default SupplierForm;
