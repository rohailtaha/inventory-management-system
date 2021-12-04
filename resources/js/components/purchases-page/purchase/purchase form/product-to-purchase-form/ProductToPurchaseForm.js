import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  float,
  isEmpty,
  numericString,
  removeExtraSpaces,
} from '../../../../../utils/utility_functions';
import {
  add_product_to_purchase,
  hide_products_to_purchase_form_error,
  show_products_to_purchase_form_error,
} from '../../../../../actions/purchases/purchases-actions';
import FormError from '../../../../common/form-error/FormError';

export default function ProductToPurchaseForm() {
  const [products, productsToPurchase, error] = useSelector(state => [
    state.products.list,
    state.purchases.productsToPurchase,
    state.purchases.productsToPurchaseFormError,
  ]);

  const defaultForm = {
    id: '',
    barcode: '',
    name: '',
    per_item_cost: '',
    quantity: '',
  };

  const [form, setForm] = useState(defaultForm);

  const dispatch = useDispatch();

  const getProduct = barcode =>
    products.find(product => product.barcode === barcode);

  const totalCost = () => {
    if (!isEmpty(form.quantity) && !isEmpty(form.per_item_cost)) {
      return float(parseInt(form.quantity) * float(form.per_item_cost));
    }
    return '';
  };

  const addProductToForm = () => {
    const product = getProduct(removeExtraSpaces(form.barcode));
    if (product) {
      setForm(form => ({
        ...form,
        id: product.id,
        name: product.name,
        per_item_cost: numericString(product.purchase_price),
        quantity: '1',
      }));
    }
  };

  const productExists = () => products.some(product => product.id === form.id);
  const productAlreadyAdded = () =>
    productsToPurchase.some(product => product.id === form.id);

  const handleChange = event =>
    setForm(form => ({
      ...form,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = event => {
    event.preventDefault();
    const validator = validate();
    if (validator.error) {
      dispatch(show_products_to_purchase_form_error(validator.msg));
    } else {
      dispatch(add_product_to_purchase(dataWithCorrectFormat()));
      dispatch(hide_products_to_purchase_form_error());
      resetForm();
    }
  };

  const dataWithCorrectFormat = () => ({
    id: parseInt(form.id),
    name: removeExtraSpaces(form.name),
    per_item_cost: numericString(form.per_item_cost),
    quantity: parseInt(form.quantity),
    total_cost: numericString(totalCost()),
  });

  const validate = () => {
    const errorObj = {
      error: true,
      msg: '',
    };

    if (!productExists()) {
      errorObj.msg = 'The product does not exist.';
      return errorObj;
    }
    if (productAlreadyAdded()) {
      errorObj.msg = 'This product has already been added.';
      return errorObj;
    }

    return {
      success: true,
    };
  };

  const resetForm = () => setForm(defaultForm);

  useEffect(() => cleanup, []);

  const cleanup = () => {
    dispatch(hide_products_to_purchase_form_error());
  };

  return (
    <form className='mt-4' onSubmit={handleSubmit}>
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
        <button
          className='btn btn-secondary btn-sm ms-3 px-1 py-1 fw-bold d-flex align-items-center add-btn'
          onClick={addProductToForm}
          type='button'
        >
          <span className='material-icons me-1'> add </span> Add
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
          name='name'
          value={form.name}
          readOnly
          required
        />
      </div>
      <div className='d-md-flex mb-3'>
        <div className='me-md-2 mb-2 mb-md-0'>
          <label htmlFor='per_item_cost' className='form-label fw-bold'>
            Per Item Cost
          </label>
          <div className='input-group input-group-sm'>
            <span className='input-group-text'>RS</span>
            <input
              type='number'
              className='form-control'
              id='per_item_cost'
              onChange={handleChange}
              name='per_item_cost'
              value={form.per_item_cost}
              min='0'
              step='0.01'
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
            min='1'
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
              name='totalCost'
              value={totalCost() ? numericString(totalCost()) : ''}
              step='0.01'
              min='0'
              required
              readOnly
            />
          </div>
        </div>
      </div>
      <button type='submit' className='btn btn-sm btn-secondary fw-bold mb-3'>
        Add to List
      </button>
      {error.show && <FormError msg={error.msg} />}
    </form>
  );
}
