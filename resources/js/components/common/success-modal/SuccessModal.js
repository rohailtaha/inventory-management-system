import { useDispatch } from 'react-redux';
import { hide_success_message } from '../../../actions/success-message/success-message-actions';

function SuccessModal({ msg }) {
  const dispatch = useDispatch();

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
              onClick={() => dispatch(hide_success_message())}
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
              onClick={() => dispatch(hide_success_message())}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
