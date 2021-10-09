import { useState } from 'react';
import { Link } from 'react-router-dom';
import Customer from './Customer';
import PaymentMismatchModal from './messages/PaymentMismatchModal';

function SaleForm({ mode }) {
  const [form, setForm] = useState({
    barcode: '',
    product: '',
    category: '',
    salePrice: null,
    discount: null,
    discountedSalePrice: null,
    quantity: null,
    customer: '',
    paymentReceived: null,
    paymentReturned: null,
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(form => ({
      ...form,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    // parse amounts to integers
    // check if net Payment matches grand total
  };

  return (
    <form className='mt-4'>
      <div className='mb-2 d-flex align-items-center'>
        <input
          type='text'
          className='form-control form-control-sm w-auto'
          id='barcode'
          placeholder='Enter Barcode'
          onChange={handleChange}
          name='barcode'
          value={form.barcode}
        />
        <button className='btn btn-secondary btn-sm ms-3 px-2 py-1 fw-bold'>
          <i className='fas fa-plus me-2'></i> Add
        </button>
      </div>
      <div className='mb-2'>
        <label htmlFor='product' className='form-label fw-bold'>
          Product
        </label>
        <input
          type='text'
          className='form-control form-control-sm'
          id='product'
          name='product'
          value={form.product}
          readOnly
        />
      </div>
      <div className='d-md-flex mb-2 align-items-end'>
        <div className='mb-2 mb-md-0 me-md-2 flex-grow-1'>
          <label htmlFor='sale-price' className='form-label fw-bold'>
            Sale price
          </label>
          <div className='input-group input-group-sm'>
            <span className='input-group-text'>RS</span>
            <input
              type='text'
              className='form-control'
              id='sale-price'
              name='salePrice'
              value={form.salePrice}
            />
          </div>
        </div>
        <div className='mb-2 mb-md-0 me-md-2 flex-grow-1'>
          <label htmlFor='discount' className='form-label fw-bold'>
            Discount
          </label>
          <div className='input-group input-group-sm'>
            <span className='input-group-text'>%</span>
            <input
              type='number'
              className='form-control form-control-sm'
              id='discount'
              onChange={handleChange}
              name='discount'
              value={form.discount}
            />
          </div>
        </div>
        <div className='mb-2 mb-md-0 me-md-2 flex-grow-1'>
          <label
            htmlFor='discounted-sale-price'
            className='form-label fw-bold text-nowrap'
          >
            Discounted Sale Price
          </label>
          <div className='input-group input-group-sm'>
            <span className='input-group-text'>RS</span>
            <input
              type='text'
              className='form-control'
              id='discounted-sale-price'
              name='discountedSalePrice'
              value={form.discountedSalePrice}
              readOnly
            />
          </div>
        </div>
      </div>
      <div className='mb-1'>
        <label htmlFor='quantity' className='form-label fw-bold'>
          Quantity
        </label>
        <input
          type='number'
          className='form-control form-control-sm'
          id='quantity'
          onChange={handleChange}
          name='quantity'
          value={form.quantity}
        />
      </div>
      <div className='mb-3'>
        <label className='form-label fw-bold'>Net Total (RS): </label>
        <div className='input-group input-group-sm'>
          <span className='input-group-text'>RS</span>
          <input
            type='text'
            className='form-control'
            id='discounted-sale-price'
            name='discountedSalePrice'
            value={form.discountedSalePrice}
            readOnly
          />
        </div>
      </div>
      <button type='submit' className='btn btn-sm btn-secondary fw-bold me-3'>
        Add to List
      </button>

      <hr />
      <div className='mb-3'>
        <label htmlFor='customer' className='form-label fw-bold'>
          Customer
        </label>
        <select
          className='form-select form-select-sm'
          id='customer'
          name='customer'
          value={form.customer}
          onChange={handleChange}
          required
        >
          {customers.map(customer => (
            <Customer name={customer.name} key={customer.id} />
          ))}
        </select>
      </div>

      <hr />

      <div className='mb-2'>
        <label htmlFor='grand-total' className='form-label fw-bold text-nowrap'>
          Grand Total
        </label>
        <div className='input-group input-group-sm'>
          <span className='input-group-text'>RS</span>
          <input
            type='text'
            className='form-control'
            id='grand-total'
            onChange={handleChange}
            name='grandTotal'
            value={form.discountedSalePrice}
            readOnly
            required
          />
        </div>
      </div>

      <div className='d-md-flex mb-3 align-items-end'>
        <div className='me-md-2 mb-2 mb-md-0'>
          <label
            htmlFor='discounted-sale-price'
            className='form-label fw-bold text-nowrap'
          >
            Payment Received
          </label>
          <div className='input-group input-group-sm'>
            <span className='input-group-text'>RS</span>
            <input
              type='number'
              className='form-control'
              id='discounted-sale-price'
              onChange={handleChange}
              name='discountedSalePrice'
              value={form.paymentReceived}
              required
            />
          </div>
        </div>
        <div className='me-md-2 mb-2 mb-md-0'>
          <label
            htmlFor='discounted-sale-price'
            className='form-label fw-bold text-nowrap'
          >
            Returned
          </label>
          <div className='input-group input-group-sm'>
            <span className='input-group-text'>RS</span>
            <input
              type='number'
              className='form-control'
              id='discounted-sale-price'
              onChange={handleChange}
              name='discountedSalePrice'
              value={form.paymentReturned}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor='discounted-sale-price'
            className='form-label fw-bold text-nowrap'
          >
            Net Payment
          </label>
          <div className='input-group input-group-sm'>
            <span className='input-group-text'>RS</span>
            <input
              type='text'
              className='form-control'
              id='discounted-sale-price'
              onChange={handleChange}
              name='discountedSalePrice'
              value={form.discountedSalePrice}
              readOnly
              required
            />
          </div>
        </div>
      </div>

      <div className='mb-4'>
        <label htmlFor='status' className='form-label fw-bold'>
          Payment Status
        </label>
        <select
          className='form-select form-select-sm'
          id='status'
          onChange={handleChange}
          name='status'
          value={form.status}
          required
        >
          {paymentStatuses.map(status => (
            <option key={status.id} value={status.value}>
              {status.value}
            </option>
          ))}
        </select>
      </div>

      <div className='d-sm-flex'>
        <button
          type='submit'
          className='btn btn-primary flex-grow-1 mb-2 mb-sm-0'
          onSubmit={handleSubmit}
        >
          {mode === 'CREATE' ? 'Confirm Sale' : 'Save Changes'}
        </button>
        <Link to='/sales' className='btn btn-danger flex-grow-1 ms-sm-3'>
          Cancel
        </Link>
      </div>
      <hr />
      <PaymentMismatchModal grandTotal={1200} netPayment={1100} />
    </form>
  );
}

const customers = [
  { id: 1, name: 'General Customer' },
  { id: 2, name: 'Waqas' },
];
const paymentStatuses = [
  { id: 1, value: 'Paid' },
  { id: 2, value: 'Unpaid' },
  { id: 3, value: 'Partial' },
];
export default SaleForm;
