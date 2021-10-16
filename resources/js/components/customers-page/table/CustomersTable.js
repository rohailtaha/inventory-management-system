import { useSelector } from 'react-redux';
import Customer from './Customer';

function CustomersTable() {
  const customers = useSelector(state => state.customers.list);

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
        {customers.map(customer => (
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
