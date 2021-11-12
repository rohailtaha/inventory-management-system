import PaymentStatusBadge from '../../../common/payment status badge/PaymentStatusBadge';

function Sale({ date, id, customer, grandTotal, amountPaid, paymentStatus }) {
  return (
    <tr>
      <td>{date}</td>
      <td>{id}</td>
      <td>{customer}</td>
      <td>{grandTotal}</td>
      <td>{amountPaid}</td>
      <td>
        <PaymentStatusBadge status={paymentStatus} />
      </td>
    </tr>
  );
}

export default Sale;
