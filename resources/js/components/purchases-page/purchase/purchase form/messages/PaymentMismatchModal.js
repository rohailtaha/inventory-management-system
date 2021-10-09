import React from 'react';

function PaymentMismatchModal({grandTotal, payment}) {
  return (
    <div className='modal' tabIndex='-1'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header bg-warning'>
            <h5 className='modal-title'>Warning</h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <p>
              {' '}
              The <b>grand total (RS {grandTotal})</b> does not match the{' '}
              <b>amount paid (RS {payment})</b>. Do you want to confirm payment
              anyways?
            </p>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-primary'>
              Confirm
            </button>
          </div>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Close
            </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentMismatchModal;
