import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resort_suppliers,
  sort_suppliers,
} from '../../../actions/suppliers/suppliers-actions';
import SortArrows from '../../common/sort-arrows/SortArrows';
import Supplier from './Supplier';

function SuppliersTable() {
  const [suppliers, pagination] = useSelector(state => [
    state.suppliers.list,
    state.pagination,
  ]);

  const dispatch = useDispatch();

  const itemsForCurrentPage = () =>
    suppliers.slice(
      initialItemIndexForCurrentPage(),
      initialItemIndexForCurrentPage() + pagination.itemsPerPage
    );

  const initialItemIndexForCurrentPage = () =>
    (pagination.currentPage - 1) * pagination.itemsPerPage;

  const sort = (key, order) => dispatch(sort_suppliers(key, order));

  useEffect(() => cleanup, []);

  const cleanup = () => dispatch(resort_suppliers());

  return (
    <div className='table-responsive'>
      <table className='table'>
        <thead>
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
          {itemsForCurrentPage().map(supplier => (
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

export default SuppliersTable;
