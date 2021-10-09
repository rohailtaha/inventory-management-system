function InventoryStats({ inStock, underStock }) {
  return (
    <section className='stats'>
      <h2 className='fw-bold'>Inventory</h2>
      <div className='grid'>
        <div className='card border-0'>
          <div className='card-body ps-0'>
            <h5 className='card-title'>Items in Stock</h5>
            <span className='card-text'> {inStock} </span>
          </div>
        </div>

        <div className='card border-0'>
          <div className='card-body ps-0'>
            <h5 className='card-title'>Under Stock Items</h5>
            <span className='card-text'> {underStock} </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InventoryStats;
