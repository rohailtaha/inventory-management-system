import AddedPurchase from './AddedPurchase';

function AddedPurchasesTable() {
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
            {records.map(record => (
              <AddedPurchase
                key={record.id}
                id={record.id}
                product={record.product}
                quantity={record.quantity}
                purchasePrice={record.perItemPrice}
                totalPrice={record.totalPrice}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const records = [
  {
    id: 1,
    product: 'product 1',
    quantity: 12,
    perItemPrice: 50,
    totalPrice: 1000,
  },
  {
    id: 2,
    product: 'product 2',
    quantity: 12,
    perItemPrice: 50,
    totalPrice: 1000,
  },
];

export default AddedPurchasesTable;
