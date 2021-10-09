import Customer from './Customer';

function CustomersTable() {
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
        {customers.map((customer, index) => (
          <Customer
            name={customer.name}
            email={customer.email}
            phone={customer.phone}
            address={customer.address}
            key={index}
          />
        ))}
      </tbody>
    </table>
  );
}

const customers = [
  {
    id: 1,
    name: 'Haris',
    email: 'waqas@gmail.com',
    phone: '039097855648',
    address: 'random address street 5A',
  },
  {
    id: 2,
    name: 'WaqaWazir',
    email: 'waqas@gmail.com',
    phone: '039097855648',
    address: 'random address street 5A',
  },
  {
    id: 3,
    name: 'Tahir',
    email: 'waqas@gmail.com',
    phone: '039097855648',
    address: 'random address street 5A',
  },
];

export default CustomersTable;
