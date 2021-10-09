import { Link } from "react-router-dom";
import PaymentStatusBadge from "../../common/payment status badge/PaymentStatusBadge";

function Sale({
  date,
  id,
  customer,
  grandTotal,
  netPayment,
  paymentStatus,
}) {
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
          to='/edit_sale'
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

export default Sale;
