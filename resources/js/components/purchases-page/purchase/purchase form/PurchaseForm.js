import { isEmpty } from '../../../../utils/utility_functions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SupplierOption from '../../../common/supplier option/SupplierOption';
import PaymentMismatchModal from './messages/PaymentMismatchModal';
import PurchaseStatusOption from './PurchaseStatusOption';
import { add_product_to_purchase } from '../../../../actions/purchases/purchases-actions';
import ProductToPurchaseForm from './product-to-purchase-form/ProductToPurchaseForm';

function PurchaseForm({ mode }) {
  return (
    <Fragment>
      <ProductToPurchaseForm />
      <form>
        <button
          type='submit'
          className='btn btn-sm btn-secondary fw-bold'
          onClick={addProductToPurchase}
        >
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
            <Link
              to='/purchases'
              className='btn btn-danger flex-grow-1 ms-sm-3'
            >
              Cancel
            </Link>
          </div>
        </div>
        <hr className='my-4' />
        <PaymentMismatchModal grandTotal={16600} payment={15000} />
      </form>
    </Fragment>
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
