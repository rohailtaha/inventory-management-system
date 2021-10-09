import AddedSale from "./AddedSale";

function AddedSalesTable() {
  return (
    <div className='table-container'>
      <div className='table-responsive mt-4'>
        <table className='table table-sm'>
          <thead>
            <tr>
              <th scope='col'>Product</th>
              <th scope='col'>Sale Price (RS)</th>
              <th scope='col'>Discount (%)</th>
              <th scope='col'>Discounted Price (RS)</th>
              <th scope='col'>Qty</th>
              <th scope='col'>Net Total (RS)</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <AddedSale
                key={record.id}
                id={record.id}
                product={record.product}
                salePrice={record.salePrice}
                discount={record.discount}
                discountedSalePrice={record.discountedSalePrice}
                quantity={record.quantity}
                netTotal={record.totalPrice}
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
    salePrice: 250,
    discount: 4,
    discountedSalePrice: 220,
    quantity: 12,
    totalPrice: 1000,
  },
  {
    id: 2,
    product: 'product 2',
    salePrice: 250,
    discount: 4,
    discountedSalePrice: 220,
    quantity: 12,
    totalPrice: 1000,
  },
];

export default AddedSalesTable;
