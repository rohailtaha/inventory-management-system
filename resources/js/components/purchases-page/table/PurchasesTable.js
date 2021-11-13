import { useSelector } from 'react-redux';
import Purchase from './Purchase';

function PurchasesTable() {
  const [purchases, pagination] = useSelector(state => [
    state.purchases.list,
    state.pagination,
  ]);

  const itemsForCurrentPage = () =>
    purchases.slice(
      initialItemIndexForCurrentPage(),
      initialItemIndexForCurrentPage() + pagination.itemsPerPage
    );

  const initialItemIndexForCurrentPage = () =>
    (pagination.currentPage - 1) * pagination.itemsPerPage;
  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Date</th>
          <th scope='col'>Purchase ID</th>
          <th scope='col'>Purchase Status</th>
          <th scope='col'>Grand Total (RS)</th>
          <th scope='col'>Amount Paid (RS)</th>
          <th scope='col'>Payment Status</th>
          <th scope='col'>Supplier</th>
          <th scope='col'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {itemsForCurrentPage().map(purchase => (
          <Purchase
            key={purchase.id}
            date={purchase.date}
            id={purchase.id}
            purchaseStatus={purchase.purchase_status}
            grandTotal={purchase.grand_total}
            amountPaid={purchase.amount_paid}
            paymentStatus={purchase.payment_status}
            supplier={purchase.supplier}
          />
        ))}
      </tbody>
    </table>
  );
}

export default PurchasesTable;
