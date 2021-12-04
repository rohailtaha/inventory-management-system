import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resort_products,
  sort_products,
} from '../../../actions/products/products-actions';
import { userRoles } from '../../../utils/util_structures';
import SortArrows from '../../common/sort-arrows/SortArrows';
import Product from './Product';

export default function ProductsTable({ products }) {
  const [pagination, userRole] = useSelector(state => [
    state.pagination,
    state.users.user.role,
  ]);

  const dispatch = useDispatch();

  const itemsForCurrentPage = () =>
    products.slice(
      initialItemIndexForCurrentPage(),
      initialItemIndexForCurrentPage() + pagination.itemsPerPage
    );

  const initialItemIndexForCurrentPage = () =>
    (pagination.currentPage - 1) * pagination.itemsPerPage;

  const sort = (key, order) => dispatch(sort_products(key, order));

  useEffect(() => cleanup, []);

  const cleanup = () => dispatch(resort_products());

  return (
    <div className='table-responsive'>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>
              Barcode
              <SortArrows aKey='barcode' sort={sort} />
            </th>
            <th scope='col'>
              Name
              <SortArrows aKey='name' sort={sort} />
            </th>
            <th scope='col'>
              Category
              <SortArrows aKey='category' sort={sort} />
            </th>
            <th scope='col'>
              Quantity
              <SortArrows aKey='quantity' sort={sort} />
            </th>
            <th scope='col'>
              Purchase Price (RS)
              <SortArrows aKey='purchase_price' sort={sort} />
            </th>
            <th scope='col'>
              Final Sale Price (RS)
              <SortArrows aKey='final_sale_price' sort={sort} />
            </th>
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
    </div>
  );
}
