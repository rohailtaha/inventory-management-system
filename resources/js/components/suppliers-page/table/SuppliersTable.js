import { useDispatch, useSelector } from 'react-redux';
import {
  resort_suppliers,
  sort_suppliers,
} from '../../../actions/suppliers/suppliers-actions';
import useItemsForCurrentPage from '../../../hooks/useItemsForCurrentPage';
import SortArrows from '../../common/sort-arrows/SortArrows';
import withCleaner from '../../hocs/withCleaner';
import Supplier from './Supplier';

function SuppliersTable() {
  const [suppliers] = useSelector(state => [state.suppliers.list]);

  const dispatch = useDispatch();

  const itemsForCurrentPage = useItemsForCurrentPage(suppliers);

  const sort = (key, order) => dispatch(sort_suppliers(key, order));

  return (
    <div className='table-responsive'>
      <table className='table'>
        <thead className='table-light'>
          <tr>
            <th scope='col'>
              Name <SortArrows aKey='name' sort={sort} />
            </th>
            <th scope='col'>
              Email <SortArrows aKey='email' sort={sort} />
            </th>
            <th scope='col'>
              Contact <SortArrows aKey='contact' sort={sort} />
            </th>
            <th scope='col'>
              Address <SortArrows aKey='address' sort={sort} />
            </th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {itemsForCurrentPage.map(supplier => (
            <Supplier
              key={supplier.id}
              id={supplier.id}
              name={supplier.name}
              email={supplier.email}
              contact={supplier.contact}
              address={supplier.address}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default withCleaner(SuppliersTable, [resort_suppliers]);
