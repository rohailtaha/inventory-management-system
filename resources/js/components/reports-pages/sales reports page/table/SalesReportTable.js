import Sale from './Sale';

function SalesReportTable() {

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Product</th>
          <th scope='col'>Qty Sold</th>
          <th scope='col'>Amount Collected (RS)</th>
          <th scope='col'>Sales Profit (RS)</th>
        </tr>
      </thead>
      <tbody>
        {sales.map(sale => (
          <Sale
            key={sale.id}
            id={sale.id}
            product={sale.product}
            quantity={sale.quantity}
            amount={sale.amount}
            salesProfit={sale.salesProfit}
          />
        ))}
        <tr>
          <td></td>
          <td></td>
          <td>
            <b> Total Income:</b> {129088}
          </td>
          <td>
            {' '}
            <b>Total Profit:</b> {1289}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

const sales = [
  {
    id: 1,
    product: 'Product 1 bal bla',
    quantity: 5100,
    amount: 999000,
    salesProfit: 45000,
  },
  {
    id: 2,
    product: 'Product 2 bal bla',
    quantity: 5100,
    amount: 999000,
    salesProfit: 45000,
  },
  {
    id: 3,
    product: 'Product 2 bal bla',
    quantity: 5100,
    amount: 999000,
    salesProfit: 45000,
  },
  {
    id: 4,
    product: 'Product 2 bal bla',
    quantity: 5100,
    amount: 999000,
    salesProfit: 45000,
  },
  {
    id: 5,
    product: 'Product 2 bal bla',
    quantity: 5100,
    amount: 999000,
    salesProfit: 45000,
  },
  {
    id: 6,
    product: 'Product 2 bal bla',
    quantity: 5100,
    amount: 999000,
    salesProfit: 45000,
  },
  {
    id: 7,
    product: 'Product 2 bal bla',
    quantity: 5100,
    amount: 999000,
    salesProfit: 45000,
  },
  {
    id: 8,
    product: 'Product 2 bal bla',
    quantity: 5100,
    amount: 999000,
    salesProfit: 45000,
  },
  {
    id: 9,
    product: 'Product 2 bal bla',
    quantity: 5100,
    amount: 999000,
    salesProfit: 45000,
  },
];

export default SalesReportTable;
