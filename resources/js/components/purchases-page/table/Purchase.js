import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { show_delete_confirmation } from '../../../actions/delete-confirmation/delete-confirmation-actions';
import { numericString } from '../../../utils/utility_functions';
import PaymentStatusBadge from '../../common/payment status badge/PaymentStatusBadge';

function Purchase({
  id,
  date,
  invoice_id,
  purchaseStatus,
  grandTotal,
  amountPaid,
  paymentStatus,
  supplier,
}) {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{date}</td>
      <td className='text-nowrap'>{invoice_id}</td>
      <td>{purchaseStatus}</td>
      <td>{numericString(grandTotal)}</td>
      <td>{numericString(amountPaid)}</td>
      <td>
        {' '}
        <PaymentStatusBadge status={paymentStatus} />{' '}
      </td>
      <td>{supplier}</td>
      <td>
        <Link
          to={`/purchases/${id}`}
          className='btn p-0'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='View'
        >
          <span className='material-icons'>visibility</span>
        </Link>
        <Link
          to={`/purchases/${id}/edit`}
          className='btn p-0'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='Edit'
        >
          <span className='material-icons'>edit</span>
        </Link>
        <button
          onClick={() => dispatch(show_delete_confirmation(id))}
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
