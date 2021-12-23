import { useDispatch, useSelector } from 'react-redux';
import {
  resort_purchases,
  sort_purchases,
} from '../../../actions/purchases/purchases-actions';
import useItemsForCurrentPage from '../../../hooks/useItemsForCurrentPage';
import { getDate } from '../../../utils/utility_functions';
import SortArrows from '../../common/sort-arrows/SortArrows';
import withCleaner from '../../hocs/withCleaner';
import Purchase from './Purchase';

function PurchasesTable() {
  const [purchases] = useSelector(state => [state.purchases.list]);

  const dispatch = useDispatch();

  const itemsForCurrentPage = useItemsForCurrentPage(purchases);

  const sort = (key, order) => dispatch(sort_purchases(key, order));

  return (
    <div className='table-responsive'>
      <table className='table'>
        <thead className='table-light'>
          <tr>
            <th scope='col'>
              Date <SortArrows aKey='created_at' sort={sort} />{' '}
            </th>
            <th scope='col'>
              Invoice Id
              <SortArrows aKey='invoice_id' sort={sort} />
            </th>
            <th scope='col'>
              Purchase Status
              <SortArrows aKey='purchase_status' sort={sort} />
            </th>
            <th scope='col'>
              Grand Total (RS)
              <SortArrows aKey='grand_total' sort={sort} />
            </th>
            <th scope='col'>
              Amount Paid (RS)
              <SortArrows aKey='amount_paid' sort={sort} />
            </th>
            <th scope='col'>
              Payment Status
              <SortArrows aKey='payment_status' sort={sort} />
            </th>
            <th scope='col'>
              Supplier
              <SortArrows aKey='supplier' sort={sort} />
            </th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {itemsForCurrentPage.map(purchase => (
            <Purchase
              key={purchase.id}
              id={purchase.id}
              date={getDate(purchase.created_at)}
              invoice_id={purchase.invoice_id}
              purchaseStatus={purchase.purchase_status}
              grandTotal={purchase.grand_total}
              amountPaid={purchase.amount_paid}
              paymentStatus={purchase.payment_status}
              supplier={purchase.supplier}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default withCleaner(PurchasesTable, [resort_purchases]);
