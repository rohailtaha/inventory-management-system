import { numericString } from '../../../../utils/utility_functions';

export default function Payment({
  status,
  grandTotal,
  paymentReceived,
  paymentReturned,
  netPayment,
}) {
  return (
    <section className='sale-invoice__payment mt-4'>
      <h3 className='text-secondary text-decoration-underline'>Payment</h3>
      <div>
        {' '}
        <span className='fw-bold'> Status: </span> <span> {status} </span>{' '}
      </div>

      <table className='table table-sm table-bordered mt-3'>
        <tbody>
          <tr>
            <th scope='col'>Grand Total (RS)</th>
            <td className='fw-bold'> {numericString(grandTotal)} </td>
          </tr>
          <tr>
            <th scope='col'>Received (RS)</th>
            <td> {numericString(paymentReceived)} </td>
          </tr>
          <tr>
            <th scope='col'>Returned (RS)</th>
            <td> {numericString(paymentReturned)} </td>
          </tr>
          <tr>
            <th scope='col'>Net Payment (RS)</th>
            <td className='fw-bold'> {numericString(netPayment)} </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
