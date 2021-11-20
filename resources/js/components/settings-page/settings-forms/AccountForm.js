import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hide_success_message } from '../../../actions/success-message/success-message-actions';
import {
  hide_error,
  request_update_current_user,
} from '../../../actions/users/users-actions';
import { removeExtraSpaces } from '../../../utils/utility_functions';
import FormError from '../../common/form-error/FormError';

export default function AccountForm() {
  const [user, error, successMessage] = useSelector(state => [
    state.users.user,
    state.users.error,
    state.successMessage,
  ]);

  const [editable, setEditable] = useState(false);

  const [nameRef, emailRef, phoneRef] = [useRef(), useRef(), useRef()];
  const refs = [nameRef, emailRef, phoneRef];

  const dispatch = useDispatch();

  const defaultFormState = () => {
    nameRef.current.value = user.name;
    emailRef.current.value = user.email;
    phoneRef.current.value = user.phone;
  };

  useEffect(() => {
    if (!editable) {
      dispatch(hide_error());
      defaultFormState();
    }
  }, [editable]);

  const enableEdit = () => {
    refs.forEach(ref => ref.current.removeAttribute('readonly'));
    setEditable(true);
  };

  const disableEdit = () => {
    refs.forEach(ref => ref.current.setAttribute('readonly', 'readonly'));
    setEditable(false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(request_update_current_user(dataWithCorrectFormat()));
  };

  const dataWithCorrectFormat = () => ({
    name: removeExtraSpaces(nameRef.current.value),
    email: removeExtraSpaces(emailRef.current.value),
    phone: removeExtraSpaces(phoneRef.current.value),
  });

  useEffect(() => {
    if (successMessage.show) disableEdit();
  }, [successMessage.show]);

  useEffect(() => cleanup, []);
  const cleanup = () => {
    dispatch(hide_error());
    dispatch(hide_success_message());
  };

  return (
    <form className='mb-5' onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label htmlFor='name' className='form-label fw-bold'>
          Name
        </label>
        <input
          type='text'
          className='form-control form-control-sm'
          id='name'
          name='name'
          maxLength='255'
          required
          readOnly
          ref={nameRef}
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
          required
          maxLength='255'
          readOnly
          ref={emailRef}
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
          name='phone'
          required
          minLength='4'
          maxLength='20'
          readOnly
          ref={phoneRef}
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
