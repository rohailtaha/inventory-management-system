import Purchase from './Purchase';

function PurchasesReportTable() {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Date</th>
          <th scope='col'>Product</th>
          <th scope='col'>Qty Ordered</th>
          <th scope='col'>Cost (RS)</th>
          <th scope='col'>Supplier</th>
        </tr>
      </thead>
      <tbody>
        {purchases.map(purchase => (
          <Purchase
            key={purchase.id}
            id={purchase.id}
            date={purchase.date}
            product={purchase.product}
            quantity={purchase.quantity}
            cost={purchase.cost}
            supplier={purchase.supplier}
          />
        ))}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <b> Total Cost:</b> {129088}
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}

const purchases = [
  {
    id: 1,
    date: '21-03-2021',
    product: 'Product 1 bal bla',
    quantity: 100,
    cost: 10000,
    supplier: 'supplier 2',
  },
  {
    id: 2,
    date: '21-03-2021',
    product: 'Product 2 bal bla',
    quantity: 400,
    cost: 20000,
    supplier: 'supplier 2',
  },
];
export default PurchasesReportTable;
