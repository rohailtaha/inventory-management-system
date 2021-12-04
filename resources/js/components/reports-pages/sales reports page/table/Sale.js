import { numericString } from '../../../../utils/utility_functions';
import PaymentStatusBadge from '../../../common/payment status badge/PaymentStatusBadge';

function Sale({ date, id, customer, grandTotal, amountPaid, paymentStatus }) {
  return (
    <tr>
      <td className='text-nowrap'>{date}</td>
      <td>{id}</td>
      <td>{customer}</td>
      <td>{numericString(grandTotal)}</td>
      <td>{numericString(amountPaid)}</td>
      <td>
        <PaymentStatusBadge status={paymentStatus} />
      </td>
    </tr>
  );
}

export default Sale;
