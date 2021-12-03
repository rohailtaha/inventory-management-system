import PaymentStatusBadge from '../../../common/payment status badge/PaymentStatusBadge';

function Purchase({
  id,
  date,
  supplier,
  purchaseStatus,
  grandTotal,
  amountPaid,
  paymentStatus,
}) {
  return (
    <tr>
      <td className='text-nowrap'>{date}</td>
      <td>{id}</td>
      <td>{supplier}</td>
      <td>{purchaseStatus}</td>
      <td>{grandTotal}</td>
      <td>{amountPaid}</td>
      <td>
        <PaymentStatusBadge status={paymentStatus} />
      </td>
    </tr>
  );
}

export default Purchase;
