import { useSelector } from 'react-redux';
import Supplier from './Supplier';

function SuppliersTable() {
  const [suppliers, pagination] = useSelector(state => [
    state.suppliers.list,
    state.pagination,
  ]);

  const itemsForCurrentPage = () =>
    suppliers.slice(
      initialItemIndexForCurrentPage(),
      initialItemIndexForCurrentPage() + pagination.itemsPerPage
    );

  const initialItemIndexForCurrentPage = () =>
    (pagination.currentPage - 1) * pagination.itemsPerPage;

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Email</th>
          <th scope='col'>Contact</th>
          <th scope='col'>Address</th>
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
  );
}

export default SuppliersTable;
