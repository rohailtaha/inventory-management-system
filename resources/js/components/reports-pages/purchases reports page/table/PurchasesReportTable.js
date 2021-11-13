import { useSelector } from 'react-redux';
import Purchase from './Purchase';

export default function PurchasesReportTable({ purchases }) {
  const [{ currentPage, itemsPerPage }] = useSelector(state => [
    state.pagination,
  ]);

  const itemsForCurrentPage = () =>
    purchases.slice(
      initialItemIndexForCurrentPage(),
      initialItemIndexForCurrentPage() + itemsPerPage
    );

  const initialItemIndexForCurrentPage = () => (currentPage - 1) * itemsPerPage;

  const sumGrandTotal = () =>
    purchases.reduce((prev, current) => prev + current.grand_total, 0);

  const sumAmountPaid = () =>
    purchases.reduce((prev, current) => prev + current.amount_paid, 0);

  const lastPage = () =>
    Math.ceil(purchases.length / itemsPerPage) === currentPage;

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
        {itemsForCurrentPage().map(purchase => (
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
        {lastPage() && (
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
        )}
      </tbody>
    </table>
  );
}
