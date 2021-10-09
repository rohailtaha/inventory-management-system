import Sale from './Sale';

function SalesTable() {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Date</th>
          <th scope='col'>Sale ID</th>
          <th scope='col'>Customer</th>
          <th scope='col'>Grand Total (RS)</th>
          <th scope='col'>Net Payment (RS)</th>
          <th scope='col'>Payment Status</th>
          <th scope='col'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sales.map(sale => (
          <Sale
            key={sale.id}
            id={sale.id}
            customer={sale.customer}
            grandTotal={sale.grandTotal}
            netPayment={sale.netPayment}
            paymentStatus={sale.paymentStatus}
            date={sale.date}
          />
        ))}
      </tbody>
    </table>
  );
}

const sales = [
  {
    id: 1,
    customer: 'General Customer',
    grandTotal: 5100,
    netPayment: 4500,
    paymentStatus: 'PAID',
    date: '21-07-2021',
  },
  {
    id: 2,
    customer: 'General Customer',
    grandTotal: 5100,
    netPayment: 4500,
    paymentStatus: 'PAID',
    date: '21-07-2021',
  },
  {
    id: 3,
    customer: 'General Customer',
    grandTotal: 5100,
    netPayment: 4500,
    paymentStatus: 'UNPAID',
    date: '21-07-2021',
  },
];

export default SalesTable;
