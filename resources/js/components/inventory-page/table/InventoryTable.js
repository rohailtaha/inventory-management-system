import React from 'react';
import { useSelector } from 'react-redux';
import { userRoles } from '../../../utils/util_structures';
import Product from './Product';

function InventoryTable({ products }) {
  const [pagination, userRole] = useSelector(state => [
    state.pagination,
    state.users.user.role,
  ]);

  const itemsForCurrentPage = () =>
    products.slice(
      initialItemIndexForCurrentPage(),
      initialItemIndexForCurrentPage() + pagination.itemsPerPage
    );

  const initialItemIndexForCurrentPage = () =>
    (pagination.currentPage - 1) * pagination.itemsPerPage;

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Barcode</th>
          <th scope='col'>Name</th>
          <th scope='col'>Category</th>
          <th scope='col'>Quantity</th>
          <th scope='col'>Purchase Price (RS)</th>
          <th scope='col'>Final Sale Price (RS)</th>
          {userRole === userRoles.ADMIN && <th scope='col'>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {itemsForCurrentPage().map(product => (
          <Product
            key={product.id}
            id={product.id}
            barcode={product.barcode}
            name={product.name}
            category={product.category}
            quantity={product.quantity}
            purchasePrice={product.purchase_price}
            finalSalePrice={product.final_sale_price}
          />
        ))}
      </tbody>
    </table>
  );
}

export default InventoryTable;
