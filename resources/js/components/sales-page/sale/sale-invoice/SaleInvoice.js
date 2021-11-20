import { Link } from 'react-router-dom';

export default function SaleInvoice() {
  const handleClick = () => {};

  return (
    <div className='main__content main__content--sale-invoice'>
      <div className='d-flex justify-content-between mb-4 border-bottom pb-2 header-buttons'>
        <Link className='btn btn-danger' to='/sales'>
          Back
        </Link>
        <button
          type='button'
          onClick={handleClick}
          className='btn btn--print-report btn-primary d-flex align-items-center'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          title='Print'
        >
          <span className='me-2'> Print Invoice </span>
          <span className='material-icons'>print</span>
        </button>
      </div>
      <div className='sale-invoice'>
        <div className='d-flex justify-content-between'>
          <h2 className='fs-2 text-primary'>Sale Invoice</h2>
          <div>
            <h3>My Store</h3>
            <div className='sale-invoice__contact'>
              {' '}
              <span className='fw-bold'>Phone: </span>{' '}
              <span> {'03090877685'} </span>{' '}
            </div>
          </div>
        </div>

        <div className='sale-invoice__details'>
          <div>
            {' '}
            <span className='fw-bold'>Invoice No: </span>{' '}
            <span> {1238972} </span>{' '}
          </div>

          <div>
            {' '}
            <span className='fw-bold'>Date & Time: </span>{' '}
            <span> {'20-10-2021 11:44:56'} </span>{' '}
          </div>
          <div>
            {' '}
            <span className='fw-bold'>Customer: </span>{' '}
            <span> {'Walk-in-customer'} </span>{' '}
          </div>
        </div>

        <table className='table table-sm table-bordered mt-4'>
          <thead className='bg-secondary text-white'>
            <tr>
              <th scope='col'>Product</th>
              <th scope='col'>Per Item Price (RS)</th>
              <th scope='col'>Discount (%)</th>
              <th scope='col'>Final Price (RS)</th>
              <th scope='col'>Qty</th>
              <th scope='col'>Total Price (RS)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{'test'}</td>
              <td>{120}</td>
              <td>{2}</td>
              <td>{110}</td>
              <td>{2}</td>
              <td>{220}</td>
            </tr>
          </tbody>
        </table>

        <section className='sale-invoice__payment'>
          <h4 className='text-secondary text-decoration-underline'>Payment</h4>
          <div>
            {' '}
            <span className='fw-bold'> Status: </span> <span> {'Paid'} </span>{' '}
          </div>

          <table className='table table-sm table-bordered mt-3'>
            <tbody>
              <tr>
                <th scope='col'>Grand Total (RS)</th>
                <td> {220} </td>
              </tr>
              <tr>
                <th scope='col'>Received (RS)</th>
                <td> {230} </td>
              </tr>
              <tr>
                <th scope='col'>Returned (RS)</th>
                <td> {10} </td>
              </tr>
              <tr>
                <th scope='col'>Net Payment (RS)</th>
                <td> {220} </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
