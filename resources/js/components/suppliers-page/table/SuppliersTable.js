import Supplier from './Supplier';

function SuppliersTable() {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Contact</th>
          <th scope='col'>Address</th>
          <th scope='col'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {suppliers.map(supplier => (
          <Supplier
            name={supplier.name}
            contact={supplier.contact}
            address={supplier.contact}
            key={supplier.id}
          />
        ))}
      </tbody>
    </table>
  );
}

const suppliers = [
  {
    id: 1,
    name: 'supplier 1',
    contact: '03097685567',
    address: 'Islamabad, street 5A',
  },
  {
    id: 2,
    name: 'supplier 2',
    contact: '03097623567',
    address: 'Islamabad, street 5A',
  },
  {
    id: 3,
    name: 'supplier 3',
    contact: '03097685567',
    address: 'Islamabad, street 5A',
  },
];

export default SuppliersTable;
