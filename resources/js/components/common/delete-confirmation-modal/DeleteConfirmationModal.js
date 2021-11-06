import { useDispatch } from 'react-redux';
import {
  confirm_delete,
  hide_delete_confirmation,
} from '../../../actions/delete-confirmation/delete-confirmation-actions';

export default function DeleteConfirmationModal() {
  const dispatch = useDispatch();

  const hide = () => dispatch(hide_delete_confirmation());

  return (
    <div className='modal modal--visible' tabIndex='-1'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header text-white bg-danger'>
            <h5 className='modal-title'>Confirm</h5>
            <button
              type='button'
              className='btn-close text-white'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={hide}
            ></button>
          </div>
          <div className='modal-body'>
            <p>Confirm Deletion?</p>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
              onClick={() => dispatch(confirm_delete())}
            >
              Yes
            </button>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
              onClick={hide}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
