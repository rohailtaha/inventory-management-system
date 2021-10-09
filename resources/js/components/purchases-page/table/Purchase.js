import { Link } from 'react-router-dom';
import PaymentStatusBadge from '../../common/payment status badge/PaymentStatusBadge';

function Purchase({
  date,
  id,
  purchaseStatus,
  totalCost,
  amountPaid,
  paymentStatus,
  supplier,
}) {
  return (
    <tr>
      <td>{date}</td>
      <td>{id}</td>
      <td>{purchaseStatus}</td>
      <td>{totalCost}</td>
      <td>{amountPaid}</td>
      <td>
        {' '}
        <PaymentStatusBadge status={paymentStatus} />{' '}
      </td>
      <td>{supplier}</td>
      <td>
        <Link
          to='/edit_purchase'
          className='btn btn-secondary btn-sm me-2 p-1'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='Edit'
        >
          <i className='fas fa-edit action-icon fw-lighter'></i>
        </Link>
        <button
          className='btn btn-danger btn-sm p-1'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='Delete'
        >
          <i className='fas fa-trash-alt action-icon fw-lighter'></i>
        </button>
      </td>
    </tr>
  );
}

export default Purchase;
