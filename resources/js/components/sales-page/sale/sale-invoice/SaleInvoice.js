import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Payment from './Payment';
import Product from './Product';

export default function SaleInvoice() {
  const [sales] = useSelector(state => [state.sales.list]);

  const { id } = useParams();

  const sale = sales.find(sale => sale.id === parseInt(id));

  const handleClick = () => {
    document.querySelector('.header').classList.add('no-print');
    window.print();
  };

  return (
    <div className='main__content main__content--sale-invoice'>
      <div className='d-flex mb-4 border-bottom pb-2 header-buttons'>
        <Link className='btn btn-danger me-5' to='/sales'>
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
            <h3 className='mb-0'>My Store</h3>
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
            <span className='fw-bold'>Invoice #</span>
            <span>{sale.id}</span>{' '}
          </div>

          <div>
            {' '}
            <span className='fw-bold'>Date & Time: </span>{' '}
            <span>
              {' '}
              {sale.date} {sale.time}{' '}
            </span>{' '}
          </div>
          <div>
            {' '}
            <span className='fw-bold'>Customer: </span>{' '}
            <span> {sale.customer} </span>{' '}
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
            {sale.products.map(product => (
              <Product
                key={product.id}
                name={product.name}
                perItemPrice={product.per_item_price}
                discount={product.discount}
                finalSalePrice={product.final_sale_price}
                quantity={product.quantity}
                totalPrice={product.total_price}
              />
            ))}
          </tbody>
        </table>
        <Payment
          status={sale.payment_status}
          grandTotal={sale.grand_total}
          paymentReceived={sale.payment_received}
          paymentReturned={sale.payment_returned}
          netPayment={sale.net_payment}
        />
      </div>
    </div>
  );
}
