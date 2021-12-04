import { numericString } from '../../../../utils/utility_functions';

export default function Payment({ status, grandTotal, amountPaid }) {
  return (
    <section className='purchase-invoice__payment mt-4'>
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
            <th scope='col'>Amount Paid (RS)</th>
            <td className='fw-bold'> {numericString(amountPaid)} </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
