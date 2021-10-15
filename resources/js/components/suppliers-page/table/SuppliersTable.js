import { useSelector } from 'react-redux';
import Supplier from './Supplier';

function SuppliersTable() {
  const suppliers = useSelector(state => state.suppliers.list);

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
            id={supplier.id}
            name={supplier.name}
            contact={supplier.contact}
            address={supplier.address}
            key={supplier.id}
          />
        ))}
      </tbody>
    </table>
  );
}

export default SuppliersTable;
