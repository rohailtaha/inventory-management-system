import { Link } from 'react-router-dom';
import PaymentStatusBadge from '../../common/payment status badge/PaymentStatusBadge';

function Sale({ date, id, customer, grandTotal, netPayment, paymentStatus }) {
  return (
    <tr>
      <td>{date}</td>
      <td>{id}</td>
      <td>{customer}</td>
      <td>{grandTotal}</td>
      <td>{netPayment}</td>
      <td>
        <PaymentStatusBadge status={paymentStatus} />
      </td>
      <td>
        <Link
          to={`/edit-sale/${id}`}
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

export default Sale;
