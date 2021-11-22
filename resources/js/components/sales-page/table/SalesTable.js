import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resort_sales, sort_sales } from '../../../actions/sales/sales-actions';
import { getDate } from '../../../utils/utility_functions';
import SortArrows from '../../common/sort-arrows/SortArrows';
import Sale from './Sale';

function SalesTable() {
  const [sales, pagination] = useSelector(state => [
    state.sales.list,
    state.pagination,
  ]);

  const dispatch = useDispatch();

  const itemsForCurrentPage = () =>
    sales.slice(
      initialItemIndexForCurrentPage(),
      initialItemIndexForCurrentPage() + pagination.itemsPerPage
    );

  const initialItemIndexForCurrentPage = () =>
    (pagination.currentPage - 1) * pagination.itemsPerPage;

  const sort = (key, order) => dispatch(sort_sales(key, order));

  useEffect(() => cleanup, []);

  const cleanup = () => dispatch(resort_sales());

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>
            Date <SortArrows aKey='created_at' sort={sort} />
          </th>
          <th scope='col'>
            Sale ID <SortArrows aKey='id' sort={sort} />
          </th>
          <th scope='col'>
            Customer
            <SortArrows aKey='customer' sort={sort} />
          </th>
          <th scope='col'>
            Grand Total (RS)
            <SortArrows aKey='grand_total' sort={sort} />
          </th>
          <th scope='col'>
            Net Payment (RS)
            <SortArrows aKey='net_payment' sort={sort} />
          </th>
          <th scope='col'>
            Payment Status
            <SortArrows aKey='payment_status' sort={sort} />
          </th>
          <th scope='col'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {itemsForCurrentPage().map(sale => (
          <Sale
            key={sale.id}
            date={getDate(sale.created_at)}
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
