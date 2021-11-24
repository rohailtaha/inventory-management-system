import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resort_purchases,
  sort_purchases,
} from '../../../../actions/purchases/purchases-actions';
import { getDate } from '../../../../utils/utility_functions';
import SortArrows from '../../../common/sort-arrows/SortArrows';
import Purchase from './Purchase';

export default function PurchasesReportTable({ purchases }) {
  const [{ currentPage, itemsPerPage }] = useSelector(state => [
    state.pagination,
  ]);

  const dispatch = useDispatch();

  const itemsForCurrentPage = () =>
    purchases.slice(
      initialItemIndexForCurrentPage(),
      initialItemIndexForCurrentPage() + itemsPerPage
    );

  const initialItemIndexForCurrentPage = () => (currentPage - 1) * itemsPerPage;

  const sumGrandTotal = () =>
    purchases
      .reduce((prev, current) => prev + current.grand_total, 0)
      .toFixed(2);

  const sumAmountPaid = () =>
    purchases
      .reduce((prev, current) => prev + current.amount_paid, 0)
      .toFixed(2);

  const lastPage = () =>
    Math.ceil(purchases.length / itemsPerPage) === currentPage;

  const sort = (key, order) => dispatch(sort_purchases(key, order));

  useEffect(() => cleanup, []);

  const cleanup = () => dispatch(resort_purchases());

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>
            Date
            <SortArrows aKey='created_at' sort={sort} />
          </th>
          <th scope='col'>
            ID
            <SortArrows aKey='id' sort={sort} />
          </th>
          <th scope='col'>
            Supplier
            <SortArrows aKey='supplier' sort={sort} />
          </th>
          <th scope='col'>
            Status
            <SortArrows aKey='purchase_status' sort={sort} />
          </th>
          <th scope='col'>
            Grand total (RS)
            <SortArrows aKey='grand_total' sort={sort} />
          </th>
          <th scope='col'>
            Paid (RS)
            <SortArrows aKey='amount_paid' sort={sort} />
          </th>
          <th scope='col'>
            Payment status
            <SortArrows aKey='payment_status' sort={sort} />
          </th>
        </tr>
      </thead>
      <tbody>
        {itemsForCurrentPage().map(purchase => (
          <Purchase
            key={purchase.id}
            date={getDate(purchase.created_at)}
            id={purchase.id}
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
