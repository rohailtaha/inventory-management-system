import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  add_product_to_sale,
  hide_products_to_sale_form_error,
  show_products_to_sale_form_error,
} from '../../../../../actions/sales/sales-actions';
import {
  discount,
  float,
  isEmpty,
  numericString,
  removeExtraSpaces,
} from '../../../../../utils/utility_functions';
import { ERROR_DURATION } from '../../../../../utils/util_structures';
import FormError from '../../../../common/form-error/FormError';

const errorMsgs = {
  PRODUCT_ALREADY_ADDED: 'This product has already been added.',
  PRODUCT_DOES_NOT_EXIST: 'The product does not exist.',
  NOT_ENOUGH_STOCK:
    'Stock quantity of this product is less than quantity ordered.',
};

export default function ProductToSaleForm() {
  const [products, productsToSale, error] = useSelector(state => [
    state.products.list,
    state.sales.productsToSale,
    state.sales.productsToSaleFormError,
  ]);

  const defaultForm = {
    id: '',
    barcode: '',
    name: '',
    per_item_price: '',
    discount: '',
    quantity: '',
    quantityInStock: '',
  };

  const [form, setForm] = useState(defaultForm);

  const barcodeRef = useRef();

  const dispatch = useDispatch();

  const finalSalePrice = () => {
    if (!isEmpty(form.per_item_price) && !isEmpty(form.discount)) {
      const perItemPrice = float(form.per_item_price);
      const disc = float(form.discount);
      return float(perItemPrice - discount(perItemPrice, disc));
    }
    return '';
  };

  const getProduct = barcode =>
    products.find(product => product.barcode === barcode);

  const totalPrice = () => {
    if (
      !isEmpty(form.quantity) &&
      !isEmpty(form.per_item_price) &&
      !isEmpty(form.discount)
    )
      return float(parseInt(form.quantity) * finalSalePrice());
    return '';
  };

  const productAlreadyAdded = () =>
    productsToSale.some(product => product.id === parseInt(form.id));

  const addProductToForm = () => {
    const product = getProduct(removeExtraSpaces(barcodeRef.current.value));
    if (product) {
      setForm(form => ({
        ...form,
        barcode: product.barcode,
        id: product.id,
        name: product.name,
        per_item_price: numericString(product.sale_price),
        discount: numericString(product.discount),
        quantity: '1',
        quantityInStock: product.quantity,
      }));
    }
  };

  const handleChange = event =>
    setForm(form => ({
      ...form,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = event => {
    event.preventDefault();
    const validator = validate();
    if (validator.error) {
      showError(validator.msg);
    } else {
      dispatch(add_product_to_sale(dataWithCorrectFormat()));
      dispatch(hide_products_to_sale_form_error());
      resetForm();
    }
  };

  const dataWithCorrectFormat = () => ({
    id: parseInt(form.id),
    name: removeExtraSpaces(form.name),
    per_item_price: numericString(form.per_item_price),
    discount: numericString(form.discount),
    final_sale_price: numericString(finalSalePrice()),
    quantity: parseInt(form.quantity),
    total_price: numericString(totalPrice()),
  });

  const validate = () => {
    const errorObj = {
      error: true,
      msg: '',
    };

    if (!getProduct(form.barcode)) {
      errorObj.msg = errorMsgs.PRODUCT_DOES_NOT_EXIST;
      return errorObj;
    }
    if (productAlreadyAdded()) {
      errorObj.msg = errorMsgs.PRODUCT_ALREADY_ADDED;
      return errorObj;
    }
    if (form.quantity > getProduct(form.barcode).quantity) {
      errorObj.msg = errorMsgs.NOT_ENOUGH_STOCK;
      return errorObj;
    }

    return {
      success: true,
    };
  };

  const showError = (msg, duration = 0) => {
    dispatch(show_products_to_sale_form_error(msg));
    setTimeout(
      () => dispatch(hide_products_to_sale_form_error()),
      duration || ERROR_DURATION
    );
  };

  const resetForm = () => {
    barcodeRef.current.value = '';
    setForm(defaultForm);
  };

  useEffect(() => cleanup, []);

  const cleanup = () => dispatch(hide_products_to_sale_form_error());

  return (
    <form className='mt-4' onSubmit={handleSubmit}>
      <div className='mb-2 d-flex align-items-center'>
        <input
          type='text'
          className='form-control form-control-sm w-auto'
          id='barcode'
          placeholder='Enter Barcode'
          ref={barcodeRef}
          name='barcode'
        />
        <button
          className='btn btn-secondary btn-sm ms-3 px-2 py-1 fw-bold'
          type='button'
          onClick={addProductToForm}
        >
          Add
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
              value={finalSalePrice() ? numericString(finalSalePrice()) : ''}
              step='0.01'
              min='0'
              readOnly
              required
            />
          </div>
        </div>
      </div>

      <div className='d-md-flex mb-2 align-items-end'>
        <div className='mb-2 mb-md-0 me-md-2 flex-grow-1'>
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
        <div className='mb-2 mb-md-0 me-md-2 flex-grow-1'>
          <label htmlFor='inStock' className='form-label fw-bold'>
            In Stock
          </label>
          <input
            type='number'
            className='form-control form-control-sm'
            id='inStock'
            name='inStock'
            value={form.quantityInStock}
            required
            readOnly
          />
        </div>
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
            value={totalPrice() ? numericString(totalPrice()) : ''}
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
