import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {
  clear_products_from_sale,
  request_create_sale,
  request_update_sale,
  set_products_to_sale,
} from '../../../../../actions/sales/sales-actions';
import { isEmpty } from '../../../../../utils/utility_functions';
import { paymentStatus } from '../../../../../utils/util_structures';
import CustomerOption from '../../../../common/customer-option/CustomerOption';
import FormError from '../../../../common/form-error/FormError';

export default function SaleDetailsForm({ mode, grandTotal }) {
  const [sales, productsToSale, customers, successMessage, error] = useSelector(
    state => [
      state.sales.list,
      state.sales.productsToSale,
      state.customers.list,
      state.successMessage,
      state.sales.error,
    ]
  );

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    customer: customers[0].name,
    payment_received: '',
    payment_returned: '',
    payment_status: paymentStatus[0].value,
  });

  const updateMode = () => mode === 'UPDATE';

  const netPayment = () => {
    if (!isEmpty(form.payment_received) && !isEmpty(form.payment_returned)) {
      const netPayment =
        parseFloat(parseFloat(form.payment_received).toFixed(2)) -
        parseFloat(parseFloat(form.payment_returned).toFixed(2));
      return parseFloat(netPayment.toFixed(2));
    }
    return '';
  };

  const { id } = useParams();

  const getSale = id => sales.find(sale => sale.id === parseInt(id));

  useEffect(() => {
    if (updateMode()) {
      const sale = getSale(id);
      setForm({
        customer: isEmpty(sale.customer) ? customers[0].name : sale.customer,
        payment_received: sale.payment_received.toString(),
        payment_returned: sale.payment_returned.toString(),
        payment_status: sale.payment_status,
      });
      dispatch(set_products_to_sale(sale.products));
    }
  }, []);

  const handleChange = event =>
    setForm(form => ({
      ...form,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = event => {
    event.preventDefault();
    const validator = validate();
    if (validator.error) {
      dispatch(show_error(validator.msg));
    } else {
      updateMode()
        ? dispatch(request_update_sale(dataWithCorrectFormat(), id))
        : dispatch(request_create_sale(dataWithCorrectFormat()));
    }
  };

  const validate = () => {
    const errorObj = {
      error: true,
      msg: '',
    };
    if (productsToSale.length === 0) {
      errorObj.msg = 'No products added for sale.';
      return errorObj;
    }
    return {
      success: true,
    };
  };

  const dataWithCorrectFormat = () => ({
    products: productsToSale.map(product => ({
      id: product.id,
      per_item_price: product.per_item_price,
      discount: product.discount,
      final_sale_price: product.final_sale_price,
      quantity: product.quantity,
      total_price: product.total_price,
    })),
    customer_id: customers.find(customer => customer.name === form.customer).id,
    grand_total: grandTotal,
    payment_received: parseFloat(parseFloat(form.payment_received).toFixed(2)),
    payment_returned: parseFloat(parseFloat(form.payment_returned).toFixed(2)),
    net_payment: netPayment(),
    payment_status: form.payment_status,
  });

  const resetForm = () =>
    setForm({
      customer: customers[0].name,
      payment_received: '',
      payment_returned: '',
      payment_status: paymentStatus[0].value,
    });

  useEffect(() => {
    if (successMessage.show && !updateMode()) {
      resetForm();
      dispatch(clear_products_from_sale());
    }
  }, [successMessage.show]);

  return (
    <form onSubmit={handleSubmit}>
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
            <CustomerOption customer={customer.name} key={customer.id} />
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
            value={grandTotal}
            step='0.01'
            readOnly
            required
          />
        </div>
      </div>

      <div className='d-md-flex mb-3 align-items-end'>
        <div className='me-md-2 mb-2 mb-md-0'>
          <label
            htmlFor='payment-received'
            className='form-label fw-bold text-nowrap'
          >
            Payment Received
          </label>
          <div className='input-group input-group-sm'>
            <span className='input-group-text'>RS</span>
            <input
              type='number'
              className='form-control'
              id='payment-received'
              onChange={handleChange}
              name='payment_received'
              value={form.payment_received}
              step='0.01'
              required
            />
          </div>
        </div>
        <div className='me-md-2 mb-2 mb-md-0'>
          <label
            htmlFor='payment-returned'
            className='form-label fw-bold text-nowrap'
          >
            Returned
          </label>
          <div className='input-group input-group-sm'>
            <span className='input-group-text'>RS</span>
            <input
              type='number'
              className='form-control'
              id='payment-returned'
              onChange={handleChange}
              name='payment_returned'
              value={form.payment_returned}
              step='0.01'
            />
          </div>
        </div>
        <div>
          <label
            htmlFor='net-payment'
            className='form-label fw-bold text-nowrap'
          >
            Net Payment
          </label>
          <div className='input-group input-group-sm'>
            <span className='input-group-text'>RS</span>
            <input
              type='text'
              className='form-control'
              id='net-payment'
              name='net_payment'
              value={netPayment()}
              step='0.01'
              readOnly
              required
            />
          </div>
        </div>
      </div>

      <div className='mb-4'>
        <label htmlFor='payment-status' className='form-label fw-bold'>
          Payment Status
        </label>
        <select
          className='form-select form-select-sm'
          id='payment-status'
          onChange={handleChange}
          name='payment_status'
          value={form.payment_status}
          required
        >
          {paymentStatus.map(status => (
            <option key={status.id} value={status.value}>
              {status.value}
            </option>
          ))}
        </select>
      </div>

      <div className='d-sm-flex mb-3'>
        <button
          type='submit'
          className='btn btn-primary flex-grow-1 mb-2 mb-sm-0'
        >
          {updateMode() ? 'Save Changes' : 'Confirm Sale'}
        </button>
        <Link to='/sales' className='btn btn-danger flex-grow-1 ms-sm-3'>
          Cancel
        </Link>
      </div>
      {error.show && <FormError msg={error.msg} />}
    </form>
  );
}
