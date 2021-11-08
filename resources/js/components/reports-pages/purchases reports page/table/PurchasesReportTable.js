import { useSelector } from 'react-redux';
import { dateRangeTypes } from '../../../../utils/util_structures';
import Purchase from './Purchase';

export default function PurchasesReportTable() {
  const [purchases, report] = useSelector(state => [
    state.purchases.list,
    state.purchases.report,
  ]);

  const getPurchases = () => {
    if (report.dateRangeType === dateRangeTypes.ALL_TIME) return purchases;
    return purchases.filter(
      purchase =>
        purchase.date >= report.startDate && purchase.date <= report.endDate
    );
  };

  const sumGrandTotal = () =>
    getPurchases().reduce((prev, current) => prev + current.grand_total, 0);

  const sumAmountPaid = () =>
    getPurchases().reduce((prev, current) => prev + current.amount_paid, 0);

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Date</th>
          <th scope='col'>Supplier</th>
          <th scope='col'>Status</th>
          <th scope='col'>Grand total (RS)</th>
          <th scope='col'>Paid (RS)</th>
          <th scope='col'>Payment status</th>
        </tr>
      </thead>
      <tbody>
        {getPurchases().map(purchase => (
          <Purchase
            key={purchase.id}
            id={purchase.id}
            date={purchase.date}
            supplier={purchase.supplier}
            purchaseStatus={purchase.purchase_status}
            grandTotal={purchase.grand_total}
            amountPaid={purchase.amount_paid}
            paymentStatus={purchase.payment_status}
          />
        ))}
        <tr>
          <td>
            {' '}
            <b> Total: </b>{' '}
          </td>
          <td></td>
          <td></td>
          <td>
            <b> {sumGrandTotal()}</b>
          </td>
          <td>
            <b> {sumAmountPaid()}</b>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}
