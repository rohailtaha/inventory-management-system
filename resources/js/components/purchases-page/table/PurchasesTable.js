import Purchase from './Purchase';

function PurchasesTable() {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Date</th>
          <th scope='col'>Purchase ID</th>
          <th scope='col'>Purchase Status</th>
          <th scope='col'>Grand Total (RS)</th>
          <th scope='col'>Amount Paid (RS)</th>
          <th scope='col'>Payment Status</th>
          <th scope='col'>Supplier</th>
          <th scope='col'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {purchases.map(purchase => (
          <Purchase
            key={purchase.id}
            date={purchase.date}
            id={purchase.id}
            purchaseStatus={purchase.purchaseStatus}
            totalCost={purchase.totalPrice}
            amountPaid={purchase.amountPaid}
            paymentStatus={purchase.paymentStatus}
            supplier={purchase.supplier}
          />
        ))}
      </tbody>
    </table>
  );
}

const purchases = [
  {
    id: 1,
    purchaseStatus: 'Received',
    totalPrice: 250,
    amountPaid: 250,
    paymentStatus: 'UNPAID',
    supplier: 'supplier 3',
    date: '21-07-2021',
  },
  {
    id: 2,
    purchaseStatus: 'Pending',
    totalPrice: 250,
    amountPaid: 250,
    paymentStatus: 'PAID',
    supplier: 'supplier 3',
    date: '21-07-2021',
  },
];

export default PurchasesTable;
