import { useSelector } from 'react-redux';
import { dateRangeTypes } from '../../../../utils/util_structures';
import Sale from './Sale';

function SalesReportTable() {
  const [sales, report] = useSelector(state => [
    state.sales.list,
    state.sales.report,
  ]);

  const getSales = () => {
    if (report.dateRangeType === dateRangeTypes.ALL_TIME) return sales;
    return sales.filter(
      sale => sale.date >= report.startDate && sale.date <= report.endDate
    );
  };

  const sumGrandTotal = () =>
    getSales().reduce((prev, current) => prev + current.grand_total, 0);

  const sumAmountPaid = () =>
    getSales().reduce((prev, current) => prev + current.net_payment, 0);

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Date</th>
          <th scope='col'>ID</th>
          <th scope='col'>Customer</th>
          <th scope='col'>Grand total (RS)</th>
          <th scope='col'>Paid (RS)</th>
          <th scope='col'>Payment status</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>
        {getSales().map(sale => (
          <Sale
            key={sale.id}
            date={sale.date}
            id={sale.id}
            customer={sale.customer}
            grandTotal={sale.grand_total}
            amountPaid={sale.net_payment}
            paymentStatus={sale.payment_status}
          />
        ))}
        <tr>
          <td>
            {' '}
            <b> Total: </b>{' '}
          </td>
          <td></td>
          <td></td>
          <td>
            <b> {sumGrandTotal()}</b>
          </td>
          <td>
            <b> {sumAmountPaid()}</b>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}

export default SalesReportTable;
