import { useSelector } from 'react-redux';
import Sale from './Sale';

function SalesTable() {
  const [sales, pagination] = useSelector(state => [
    state.sales.list,
    state.pagination,
  ]);

  const itemsForCurrentPage = () =>
    sales.slice(
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
          <th scope='col'>Sale ID</th>
          <th scope='col'>Customer</th>
          <th scope='col'>Grand Total (RS)</th>
          <th scope='col'>Net Payment (RS)</th>
          <th scope='col'>Payment Status</th>
          <th scope='col'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {itemsForCurrentPage().map(sale => (
          <Sale
            key={sale.id}
            date={sale.date}
            id={sale.id}
            customer={sale.customer}
            grandTotal={sale.grand_total}
            netPayment={sale.net_payment}
            paymentStatus={sale.payment_status}
          />
        ))}
      </tbody>
    </table>
  );
}

export default SalesTable;
