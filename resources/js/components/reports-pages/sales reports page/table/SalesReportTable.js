import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resort_sales,
  sort_sales,
} from '../../../../actions/sales/sales-actions';
import { getDate, numericString } from '../../../../utils/utility_functions';
import SortArrows from '../../../common/sort-arrows/SortArrows';
import Sale from './Sale';

function SalesReportTable({ sales }) {
  const [{ currentPage, itemsPerPage }] = useSelector(state => [
    state.pagination,
  ]);

  const dispatch = useDispatch();

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

  const sort = (key, order) => dispatch(sort_sales(key, order));

  useEffect(() => cleanup, []);

  const cleanup = () => dispatch(resort_sales());

  return (
    <div className='table-responsive'>
      <table className='table'>
        <thead className='table-light'>
          <tr>
            <th scope='col'>
              Date
              <SortArrows aKey='created_at' sort={sort} />
            </th>
            <th scope='col'>
              Invoice Id
              <SortArrows aKey='invoice_id' sort={sort} />
            </th>
            <th scope='col'>
              Customer
              <SortArrows aKey='customer' sort={sort} />
            </th>
            <th scope='col'>
              Grand total (RS)
              <SortArrows aKey='grand_total' sort={sort} />
            </th>
            <th scope='col'>
              Paid (RS)
              <SortArrows aKey='net_payment' sort={sort} />
            </th>
            <th scope='col'>
              Payment status
              <SortArrows aKey='payment_status' sort={sort} />
            </th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {itemsForCurrentPage().map(sale => (
            <Sale
              key={sale.id}
              date={getDate(sale.created_at)}
              invoice_id={sale.invoice_id}
              customer={sale.customer}
              grandTotal={sale.grand_total}
              amountPaid={sale.net_payment}
              paymentStatus={sale.payment_status}
            />
          ))}
          {lastPage() && (
            <tr className='table-light'>
              <td>
                {' '}
                <b> Total: </b>{' '}
              </td>
              <td></td>
              <td></td>
              <td>
                <b> {numericString(sumGrandTotal())}</b>
              </td>
              <td>
                <b> {numericString(sumAmountPaid())}</b>
              </td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SalesReportTable;
