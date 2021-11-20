import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hide_success_message } from '../../../actions/success-message/success-message-actions';
import {
  hide_password_form_error,
  request_update_password,
  show_password_form_error,
} from '../../../actions/users/users-actions';
import FormError from '../../common/form-error/FormError';

const PASSWORD_MISMATCH_ERROR =
  'Confirmed password does not match with new password.';

export default function PasswordForm() {
  const [error, successMessage] = useSelector(state => [
    state.users.passwordFormError,
    state.successMessage,
  ]);

  const [editable, setEditable] = useState(false);

  const [oldPasswordRef, newPasswordRef, newPasswordConfirmationRef] = [
    useRef(),
    useRef(),
    useRef(),
  ];
  const refs = [oldPasswordRef, newPasswordRef, newPasswordConfirmationRef];

  const dispatch = useDispatch();

  const enableEdit = () => {
    setEditable(true);
  };

  const disableEdit = () => {
    setEditable(false);
  };

  const confirmPasswordMatch = () =>
    newPasswordRef.current.value === newPasswordConfirmationRef.current.value;

  useEffect(() => {
    if (editable) refs.forEach(ref => ref.current.removeAttribute('readonly'));
  }, [editable]);

  const handleSubmit = event => {
    event.preventDefault();
    if (confirmPasswordMatch()) {
      dispatch(request_update_password(dataWithCorrectFormat()));
    } else {
      dispatch(show_password_form_error(PASSWORD_MISMATCH_ERROR));
    }
  };

  const dataWithCorrectFormat = () => ({
    old_password: oldPasswordRef.current.value,
    new_password: newPasswordRef.current.value,
    new_password_confirmation: newPasswordConfirmationRef.current.value,
  });

  useEffect(() => {
    if (successMessage.show) disableEdit();
  }, [successMessage.show]);

  useEffect(() => cleanup, []);
  const cleanup = () => {
    dispatch(hide_password_form_error());
    dispatch(hide_success_message());
  };

  return (
    <form className='mb-5' onSubmit={handleSubmit}>
      {!editable && (
        <div className='mb-3'>
          <label htmlFor='password' className='form-label fw-bold'>
            Password
          </label>
          <input
            type='password'
            className='form-control form-control-sm'
            id='password'
            name='password'
            minLength='5'
            maxLength='50'
            readOnly
            value='*********'
          />
        </div>
      )}
      {editable && (
        <Fragment>
          <div className='mb-3'>
            <label htmlFor='old-password' className='form-label fw-bold'>
              Enter Old Password
            </label>
            <input
              type='password'
              className='form-control form-control-sm'
              id='old-password'
              name='old_password'
              minLength='5'
              maxLength='50'
              readOnly
              required
              ref={oldPasswordRef}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='new-password' className='form-label fw-bold'>
              Enter New Password
            </label>
            <input
              type='password'
              className='form-control form-control-sm'
              id='new-password'
              name='new_password'
              placeholder='At least 5 characters long'
              minLength='5'
              maxLength='50'
              required
              readOnly
              ref={newPasswordRef}
            />
          </div>
          <div className='mb-3'>
            <input
              type='password'
              className='form-control form-control-sm'
              id='confirm-new-password'
              name='confirm_new_password'
              minLength='5'
              maxLength='50'
              required
              placeholder='Re-enter new password'
              readOnly
              ref={newPasswordConfirmationRef}
            />
          </div>
        </Fragment>
      )}

      <div className='d-sm-flex mb-3'>
        {!editable && (
          <button onClick={enableEdit} className='btn btn-primary mb-2 mb-sm-0'>
            Change Password
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
