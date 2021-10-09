import React from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';

function InventoryTable() {

  const products = useSelector(state => state.products.list);

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
          <th scope='col'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
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
