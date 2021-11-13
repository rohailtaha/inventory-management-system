import { useSelector } from 'react-redux';
import Customer from './Customer';

function CustomersTable() {
  const [customers, pagination] = useSelector(state => [
    state.customers.list,
    state.pagination,
  ]);

  const itemsForCurrentPage = () =>
    customers.slice(
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
          <th scope='col'>Phone</th>
          <th scope='col'>Address</th>
          <th scope='col'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {itemsForCurrentPage().map(customer => (
          <Customer
            id={customer.id}
            name={customer.name}
            email={customer.email}
            phone={customer.phone}
            address={customer.address}
            key={customer.id}
          />
        ))}
      </tbody>
    </table>
  );
}

export default CustomersTable;
