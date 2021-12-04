import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Payment from './Payment';
import Product from './Product';

export default function PurchaseInvoice() {
  const [purchases] = useSelector(state => [state.purchases.list]);

  const { id } = useParams();

  const purchase = purchases.find(purchase => purchase.id === parseInt(id));

  const handleClick = () => {
    document.querySelector('.header').classList.add('no-print');
    window.print();
  };

  return (
    <div className='main__content main__content--purchase-invoice'>
      <div className='d-flex mb-4 border-bottom pb-2 header-buttons'>
        <Link className='btn btn-danger me-5' to='/purchases'>
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
      <div className='purchase-invoice'>
        <div className='d-flex justify-content-between'>
          <h2 className='fs-2 text-primary'>Purchase Invoice</h2>
          <div>
            <h3 className='mb-0'>My Store</h3>
            <div className='purchase-invoice__contact'>
              {' '}
              <span className='fw-bold'>Phone: </span>{' '}
              <span> {'03090877685'} </span>{' '}
            </div>
          </div>
        </div>

        <div className='purchase-invoice__details'>
          <div>
            {' '}
            <span className='fw-bold'>Status: </span>{' '}
            <span> {purchase.purchase_status} </span>{' '}
          </div>
          <div>
            <span className='fw-bold'>Invoice #</span>
            <span> {purchase.invoice_id}</span>
          </div>

          <div>
            {' '}
            <span className='fw-bold'>Date & Time: </span>{' '}
            <span>{purchase.created_at}</span>{' '}
          </div>
          <div>
            {' '}
            <span className='fw-bold'>Supplier: </span>{' '}
            <span> {purchase.supplier} </span>{' '}
          </div>
        </div>

        <table className='table table-sm table-bordered mt-4'>
          <thead className='bg-secondary text-white'>
            <tr>
              <th scope='col'>Product</th>
              <th scope='col'>Per Item Cost (RS)</th>
              <th scope='col'>Qty</th>
              <th scope='col'>Total Cost (RS)</th>
            </tr>
          </thead>
          <tbody>
            {purchase.products.map(product => (
              <Product
                key={product.id}
                name={product.name}
                perItemCost={product.per_item_cost}
                quantity={product.quantity}
                totalCost={product.total_cost}
              />
            ))}
          </tbody>
        </table>

        <Payment
          status={purchase.payment_status}
          grandTotal={purchase.grand_total}
          amountPaid={purchase.amount_paid}
        />
      </div>
    </div>
  );
}
