import { useSelector } from 'react-redux';
import AddedProduct from './AddedProduct';

function ProductsToSaleTable() {
  const productsToSale = useSelector(state => state.sales.productsToSale);

  return (
    <div className='table-container'>
      <div className='table-responsive mt-4'>
        <table className='table table-sm'>
          <thead>
            <tr>
              <th scope='col'>Product</th>
              <th scope='col'>Per Item Price (RS)</th>
              <th scope='col'>Discount (%)</th>
              <th scope='col'>Final Price (RS)</th>
              <th scope='col'>Qty</th>
              <th scope='col'>Total Price (RS)</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {productsToSale.map(product => (
              <AddedProduct
                key={product.id}
                id={product.id}
                name={product.name}
                perItemPrice={product.per_item_price}
                discount={product.discount}
                finalSalePrice={product.final_sale_price}
                quantity={product.quantity}
                totalPrice={product.total_price}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsToSaleTable;
