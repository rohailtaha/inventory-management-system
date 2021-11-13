import { useSelector } from 'react-redux';
import Sale from './Sale';

function SalesReportTable({ sales }) {
  const [{ currentPage, itemsPerPage }] = useSelector(state => [
    state.pagination,
  ]);

  const itemsForCurrentPage = () =>
    sales.slice(
      initialItemIndexForCurrentPage(),
      initialItemIndexForCurrentPage() + itemsPerPage
    );

  const initialItemIndexForCurrentPage = () => (currentPage - 1) * itemsPerPage;

  const sumGrandTotal = () =>
    sales.reduce((prev, current) => prev + current.grand_total, 0);

  const sumAmountPaid = () =>
    sales.reduce((prev, current) => prev + current.net_payment, 0);

  const lastPage = () => Math.ceil(sales.length / itemsPerPage) === currentPage;

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Date</th>
          <th scope='col'>ID</th>
          <th scope='col'>Customer</th>
          <th scope='col'>Grand total (RS)</th>
          <th scope='col'>Paid (RS)</th>
          <th scope='col'>Payment status</th>
          <th scope='col'></th>
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
            amountPaid={sale.net_payment}
            paymentStatus={sale.payment_status}
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

export default SalesReportTable;
