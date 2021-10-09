import { useState } from 'react';
import { Link } from 'react-router-dom';
import SupplierOption from '../../../common/supplier option/SupplierOption';
import PaymentMismatchModal from './messages/PaymentMismatchModal';
import PurchaseStatusOption from './PurchaseStatusOption';

function PurchaseForm({ mode }) {
  const [form, setForm] = useState({
    barcode: '',
    product: '',
    purchasePrice: '',
    quantity: '',
    supplier: '',
    status: '',
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
  };

  return (
    <form className='mt-4'>
      <div className='mb-3 d-flex align-items-center'>
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
          onChange={handleChange}
          name='product'
          value={form.product}
          required
        />
      </div>
      <div className='d-md-flex mb-3'>
        <div className='me-md-2 mb-2 mb-md-0'>
          <label htmlFor='purchase-price' className='form-label fw-bold'>
            Per Item Cost
          </label>
          <div className='input-group input-group-sm'>
            <span className='input-group-text'>RS</span>
            <input
              type='number'
              className='form-control'
              id='purchase-price'
              onChange={handleChange}
              name='purchasePrice'
              value={form.purchasePrice}
              required
            />
          </div>
        </div>
        <div className='me-md-2 mb-2 mb-md-0'>
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
            required
          />
        </div>
        <div className=''>
          <label htmlFor='total-cost' className='form-label fw-bold'>
            Total Cost
          </label>
          <div className='input-group input-group-sm'>
            <span className='input-group-text'>RS</span>
            <input
              type='number'
              className='form-control'
              id='totalCost'
              onChange={handleChange}
              name='totalCost'
              value={form.purchasePrice}
              required
              readOnly
            />
          </div>
        </div>
      </div>

      <button type='submit' className='btn btn-sm btn-secondary fw-bold'>
        Add to List
      </button>

      <hr className='my-4' />

      <div>
        <div className='mb-3'>
          <label htmlFor='supplier' className='form-label fw-bold'>
            Supplier
          </label>
          <select
            className='form-select form-select-sm'
            id='supplier'
            onChange={handleChange}
            name='supplier'
            value={form.supplier}
            required
          >
            {suppliers.map(supplier => (
              <SupplierOption key={supplier.id} supplier={supplier.name} />
            ))}
          </select>
        </div>
        <div className='mb-3'>
          <label htmlFor='status' className='form-label fw-bold'>
            Purchase Status
          </label>
          <select
            className='form-select form-select-sm'
            id='status'
            onChange={handleChange}
            name='status'
            value={form.status}
            required
          >
            {purchaseStatuses.map(status => (
              <PurchaseStatusOption key={status.id} status={status.value} />
            ))}
          </select>
        </div>

        <div className='mb-3 d-sm-flex align-items-center'>
          <div className='flex-grow-1 mb-2 mb-sm-0 me-sm-2'>
            <label
              htmlFor='net-amount-paid'
              className='form-label fw-bold text-nowrap'
            >
              Net Amount Paid
            </label>
            <div className='input-group input-group-sm'>
              <span className='input-group-text'>RS</span>
              <input
                type='number'
                className='form-control'
                id='net-amount-paid'
                onChange={handleChange}
                name='netAmountPaid'
                value={form.discountedSalePrice}
                required
              />
            </div>
          </div>

          <div className='flex-grow-1'>
            <label
              htmlFor='grand-total'
              className='form-label fw-bold text-nowrap'
            >
              Grand Total
            </label>
            <div className='input-group input-group-sm'>
              <span className='input-group-text'>RS</span>
              <input
                type='number'
                className='form-control'
                id='grand-total'
                onChange={handleChange}
                name='grandTotal'
                value={form.discountedSalePrice}
                required
                readOnly
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
            {mode === 'CREATE' ? 'Confirm Purchase' : 'Save Changes'}
          </button>
          <Link to='/purchases' className='btn btn-danger flex-grow-1 ms-sm-3'>
            Cancel
          </Link>
        </div>
      </div>
      <hr className='my-4' />
      <PaymentMismatchModal grandTotal={16600} payment={15000} />
    </form>
  );
}

const suppliers = [
  { id: 1, name: 'supplier 1' },
  { id: 2, name: 'supplier 1' },
];
const purchaseStatuses = [
  { id: 1, value: 'Received' },
  { id: 2, value: 'Pending' },
];
const paymentStatuses = [
  { id: 1, value: 'Paid' },
  { id: 2, value: 'Unpaid' },
  { id: 3, value: 'Partial' },
];
export default PurchaseForm;
