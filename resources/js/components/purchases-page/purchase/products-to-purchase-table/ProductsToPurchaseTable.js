import AddedProduct from './AddedProduct';
import { useSelector } from 'react-redux';

export default function ProductsToPurchaseTable() {
  const productsToPurchase = useSelector(
    state => state.purchases.productsToPurchase
  );

  return (
    <div className='table-container'>
      <div className='table-responsive mt-4'>
        <table className='table table-sm'>
          <thead>
            <tr>
              <th scope='col'>Product</th>
              <th scope='col'>Per Item Cost (RS)</th>
              <th scope='col'>Qty</th>
              <th scope='col'>Total Cost (RS)</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {productsToPurchase.map(product => (
              <AddedProduct
                key={product.id}
                id={product.id}
                name={product.name}
                quantity={product.quantity}
                purchasePrice={product.per_item_cost}
                totalCost={product.total_cost}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
