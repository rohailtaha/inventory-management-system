import { useSelector } from 'react-redux';

function InventoryStats() {
  const [products] = useSelector(state => [state.products.list]);

  const underStockProducts = () =>
    products.filter(product => product.quantity <= product.alert_quantity)
      .length;

  return (
    <section className='stats'>
      <h2 className='fw-bold'>Inventory</h2>
      <div className='grid'>
        <div className='card border-0'>
          <div className='card-body ps-0'>
            <h5 className='card-title'>Products in Stock</h5>
            <span className='card-text'> {products.length} </span>
          </div>
        </div>

        <div className='card border-0'>
          <div className='card-body ps-0'>
            <h5 className='card-title'>Under Stock Products</h5>
            <span className='card-text'> {underStockProducts()} </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InventoryStats;
