import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { show_delete_confirmation } from '../../../actions/delete-confirmation/delete-confirmation-actions';
import { numericString } from '../../../utils/utility_functions';
import PaymentStatusBadge from '../../common/payment status badge/PaymentStatusBadge';

function Sale({ date, id, customer, grandTotal, netPayment, paymentStatus }) {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{date}</td>
      <td>{id}</td>
      <td>{customer}</td>
      <td>{numericString(grandTotal)}</td>
      <td>{numericString(netPayment)}</td>
      <td>
        <PaymentStatusBadge status={paymentStatus} />
      </td>
      <td>
        <Link
          to={`/sales/${id}`}
          className='btn p-0'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='View'
        >
          <span className='material-icons'>visibility</span>
        </Link>
        <Link
          to={`/sales/${id}/edit`}
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

export default Sale;
