import { useDispatch } from 'react-redux';
import { hide_confirmation } from '../../../actions/confirmation-message.js/confirmation-message-actions';

function ConfirmationModal({ msg, cb = () => null }) {
  const dispatch = useDispatch();

  const hide = () => dispatch(hide_confirmation());

  const confirm = () => {
    cb();
    hide();
  };

  return (
    <div className='modal modal--visible' tabIndex='-1'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header text-white bg-success'>
            <h5 className='modal-title'>Success</h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={hide}
            ></button>
          </div>
          <div className='modal-body'>
            <p>{msg}</p>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
              onClick={confirm}
            >
              Confirm
            </button>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
              onClick={hide}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
