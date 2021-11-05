import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  add_product_to_sale,
  hide_products_to_sale_form_error,
  show_products_to_sale_form_error,
} from '../../../../../actions/sales/sales-actions';
import {
  discount,
  isEmpty,
  removeExtraSpaces,
} from '../../../../../utils/utility_functions';
import FormError from '../../../../common/form-error/FormError';

export default function ProductToSaleForm() {
  const [products, productsToSale, error] = useSelector(state => [
    state.products.list,
    state.sales.productsToSale,
    state.sales.productsToSaleFormError,
  ]);

  const [form, setForm] = useState({
    id: '',
    barcode: '',
    name: '',
    per_item_price: '',
    discount: '',
    quantity: '',
  });

  const dispatch = useDispatch();

  const finalSalePrice = () => {
    return parseFloat(
      (
        form.per_item_price - discount(form.per_item_price, form.discount)
      ).toFixed(2)
    );
  };

  const getProduct = barcode =>
    products.find(product => product.barcode === barcode);

  const totalPrice = () => {
    if (
      !isEmpty(form.quantity) &&
      !isEmpty(form.discount) &&
      !isEmpty(form.per_item_price)
    )
      return parseFloat(
        (parseInt(form.quantity) * finalSalePrice()).toFixed(2)
      );
    return '';
  };

  const productExists = () => products.some(product => product.id === form.id);
  const productAlreadyAdded = () =>
    productsToSale.some(product => product.id === form.id);

  const addProductToForm = () => {
    const product = getProduct(removeExtraSpaces(form.barcode));
    if (product) {
      setForm(form => ({
        ...form,
        id: product.id,
        name: product.name,
        per_item_price: product.sale_price,
        discount: product.discount,
        quantity: '1',
      }));
    }
  };

  const handleChange = event => {
    setForm(form => ({
      ...form,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    const validator = validate();
    if (validator.error) {
      dispatch(show_products_to_sale_form_error(validator.msg));
    } else {
      dispatch(add_product_to_sale(dataWithCorrectFormat()));
      dispatch(hide_products_to_sale_form_error());
      resetForm();
    }
  };

  const dataWithCorrectFormat = () => ({
    id: parseInt(form.id),
    name: removeExtraSpaces(form.name),
    per_item_price: parseFloat(form.per_item_price),
    discount: parseFloat(form.discount),
    quantity: parseInt(form.quantity),
    final_sale_price: finalSalePrice(),
    total_price: totalPrice(),
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

  const resetForm = () =>
    setForm({
      id: '',
      barcode: '',
      name: '',
      per_item_price: '',
      discount: '',
      quantity: '',
    });

  useEffect(() => cleanup, []);

  const cleanup = () => {
    dispatch(hide_products_to_sale_form_error());
  };

  return (
    <form className='mt-4' onSubmit={handleSubmit}>
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
        <button
          className='btn btn-secondary btn-sm ms-3 px-2 py-1 fw-bold'
          type='button'
          onClick={addProductToForm}
        >
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
          value={form.name}
          readOnly
          required
        />
      </div>
      <div className='d-md-flex mb-2 align-items-end'>
        <div className='mb-2 mb-md-0 me-md-2 flex-grow-1'>
          <label htmlFor='per-item-price' className='form-label fw-bold'>
            Per Item Price
          </label>
          <div className='input-group input-group-sm'>
            <span className='input-group-text'>RS</span>
            <input
              type='number'
              className='form-control'
              id='per-item-price'
              name='per_item_price'
              onChange={handleChange}
              value={form.per_item_price}
              step='0.01'
              min='0'
              required
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
              step='0.01'
              min='0'
              required
            />
          </div>
        </div>
        <div className='mb-2 mb-md-0 me-md-2 flex-grow-1'>
          <label
            htmlFor='final-sale-price'
            className='form-label fw-bold text-nowrap'
          >
            Final Sale Price
          </label>
          <div className='input-group input-group-sm'>
            <span className='input-group-text'>RS</span>
            <input
              type='text'
              className='form-control'
              id='final-sale-price'
              name='final_sale_price'
              value={finalSalePrice()}
              step='0.01'
              min='0'
              readOnly
              required
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
          min='1'
          required
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='total-price' className='form-label fw-bold'>
          Total Price (RS):{' '}
        </label>
        <div className='input-group input-group-sm'>
          <span className='input-group-text'>RS</span>
          <input
            type='text'
            className='form-control'
            id='total-price'
            name='total_price'
            value={totalPrice()}
            step='0.01'
            min='0'
            readOnly
            required
          />
        </div>
      </div>
      <button type='submit' className='btn btn-sm btn-secondary fw-bold mb-3'>
        Add to List
      </button>
      {error.show && <FormError msg={error.msg} />}
    </form>
  );
}
