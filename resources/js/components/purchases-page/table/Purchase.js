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
          to={`/edit-purchase/${id}`}
          className='btn p-0'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='Edit'
        >
          <span className='material-icons'>edit</span>
        </Link>
        <button
          className='btn p-0'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='Delete'
        >
          <span className='material-icons text-danger'>delete</span>
        </button>
      </td>
    </tr>
  );
}

export default Purchase;
