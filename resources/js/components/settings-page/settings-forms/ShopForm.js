import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  hide_error,
  request_update_shop,
} from '../../../actions/shop/shop-actions';
import { hide_success_message } from '../../../actions/success-message/success-message-actions';
import { removeExtraSpaces } from '../../../utils/utility_functions';
import FormError from '../../common/form-error/FormError';
import withCleaner from '../../hocs/withCleaner';

function ShopForm() {
  const [shop, error, successMessage] = useSelector(state => [
    state.shop,
    state.shop.error,
    state.successMessage,
  ]);

  const [editable, setEditable] = useState(false);

  const [nameRef, contactRef, addressRef] = [useRef(), useRef(), useRef()];

  const dispatch = useDispatch();

  const defaultFormState = () => {
    nameRef.current.value = shop.name;
    contactRef.current.value = shop.contact;
    addressRef.current.value = shop.address;
  };

  useEffect(() => {
    if (!editable) {
      dispatch(hide_error());
      defaultFormState();
    }
  }, [editable]);

  useEffect(defaultFormState, [shop]);

  const enableEdit = () => {
    [nameRef, contactRef, addressRef].forEach(ref =>
      ref.current.removeAttribute('readonly')
    );
    setEditable(true);
  };

  const disableEdit = () => {
    [nameRef, contactRef, addressRef].forEach(ref =>
      ref.current.setAttribute('readonly', 'readonly')
    );
    setEditable(false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(request_update_shop(dataWithCorrectFormat()));
  };

  const dataWithCorrectFormat = () => ({
    name: removeExtraSpaces(nameRef.current.value),
    contact: removeExtraSpaces(contactRef.current.value),
    address: removeExtraSpaces(addressRef.current.value),
  });

  useEffect(() => {
    if (successMessage.show) disableEdit();
  }, [successMessage.show]);

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label htmlFor='shop-name' className='form-label fw-bold'>
          Name
        </label>
        <input
          type='text'
          className='form-control form-control-sm'
          id='shop-name'
          name='name'
          minLength='1'
          maxLength='255'
          required
          readOnly
          ref={nameRef}
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
          required
          minLength='4'
          maxLength='20'
          readOnly
          ref={contactRef}
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
          required
          minLength='1'
          maxLength='255'
          readOnly
          ref={addressRef}
        />
      </div>

      <div className='d-sm-flex mb-3'>
        {!editable && (
          <button onClick={enableEdit} className='btn btn-primary mb-2 mb-sm-0'>
            Edit
          </button>
        )}
        {editable && (
          <Fragment>
            <button onClick={disableEdit} className='btn btn-danger'>
              Cancel
            </button>
            <button type='submit' className='btn btn-primary ms-sm-3'>
              Save
            </button>
          </Fragment>
        )}
      </div>
      {error.show && <FormError msg={error.msg} />}
    </form>
  );
}

export default withCleaner(ShopForm, [hide_error, hide_success_message]);
