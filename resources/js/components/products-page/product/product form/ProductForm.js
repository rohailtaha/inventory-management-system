import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useState } from 'react/cjs/react.development';
import {
  hide_error,
  request_create_product,
  request_update_product,
} from '../../../../actions/products/products-actions';
import {
  discount,
  float,
  isEmpty,
  numericString,
  removeExtraSpaces,
} from '../../../../utils/utility_functions';
import FormError from '../../../common/form-error/FormError';
import ProductCategoryOption from '../../../common/product-category-option/ProductCategoryOption';
import { hide_success_message } from '../../../../actions/success-message/success-message-actions';

function ProductForm({ mode }) {
  const [products, categories, error, successMessage] = useSelector(state => [
    state.products.list,
    state.categories.list,
    state.products.error,
    state.loading,
    state.successMessage,
  ]);

  const defautForm = {
    barcode: '',
    name: '',
    category: categories[0].name,
    description: '',
    quantity: '0',
    alert_quantity: '',
    purchase_price: '',
    sale_price: '',
    discount: '0',
  };

  const [form, setForm] = useState(defautForm);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (updateMode()) {
      const product = getProduct(id);
      setForm({
        barcode: product.barcode,
        name: product.name,
        category: isEmpty(product.category)
          ? categories[0].name
          : product.category,
        description: product.description,
        quantity: product.quantity.toString(),
        alert_quantity: product.alert_quantity.toString(),
        purchase_price: numericString(product.purchase_price),
        sale_price: numericString(product.sale_price),
        discount: numericString(product.discount),
      });
    }
  }, []);

  const updateMode = () => mode === 'UPDATE';
  const getProduct = id =>
    products.find(product => product.id === parseInt(id));

  const finalSalePrice = () => {
    if (!isEmpty(form.sale_price) && !isEmpty(form.discount)) {
      const salePrice = float(form.sale_price);
      const disc = float(form.discount);
      return float(salePrice - discount(salePrice, disc));
    }
    return '';
  };

  const handleChange = event =>
    setForm(form => ({
      ...form,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = event => {
    event.preventDefault();
    updateMode()
      ? dispatch(request_update_product(dataWithCorrectFormat(), id))
      : dispatch(request_create_product(dataWithCorrectFormat()));
  };

  const dataWithCorrectFormat = () => ({
    barcode: form.barcode,
    name: removeExtraSpaces(form.name),
    category: form.category,
    description: removeExtraSpaces(form.description),
    quantity: parseInt(form.quantity),
    alert_quantity: parseInt(form.alert_quantity),
    purchase_price: numericString(form.purchase_price),
    sale_price: numericString(form.sale_price),
    discount: numericString(form.discount),
    final_sale_price: numericString(finalSalePrice()),
  });

  useEffect(() => {
    if (successMessage.show && !updateMode()) resetForm();
  }, [successMessage.show]);

  const resetForm = () => setForm(defautForm);

  useEffect(() => cleanup, []);

  const cleanup = () => {
    dispatch(hide_error());
    dispatch(hide_success_message());
  };

  return (
    <form className='mt-4' onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label htmlFor='barcode' className='form-label fw-bold'>
          Barcode
        </label>
        <input
          type='text'
          className='form-control form-control-sm'
          id='barcode'
          name='barcode'
          value={form.barcode}
          onChange={handleChange}
          required
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='name' className='form-label fw-bold'>
          Name
        </label>
        <input
          type='text'
          className='form-control form-control-sm'
          id='name'
          name='name'
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='category' className='form-label fw-bold'>
          Category
        </label>
        <select
          className='form-select form-select-sm'
          id='category'
          name='category'
          value={form.category}
          onChange={handleChange}
          required
        >
          {categories.map(category => (
            <ProductCategoryOption name={category.name} key={category.id} />
          ))}
        </select>
      </div>

      <div className='row row-cols-1 g-2 mb-3'>
        <div className='col mb-2'>
          <label htmlFor='purchase-price' className='form-label fw-bold'>
            Purchase price
          </label>
          <div className='input-group input-group-sm'>
            <span className='input-group-text'>RS</span>
            <input
              type='number'
              className='form-control'
              id='purchase-price'
              name='purchase_price'
              value={form.purchase_price}
              onChange={handleChange}
              step='0.01'
              required
            />
          </div>
        </div>
        <div className='mb-2'>
          <label htmlFor='sale-price' className='form-label fw-bold'>
            Sale price
          </label>
          <div className='input-group input-group-sm'>
            <span className='input-group-text'>RS</span>
            <input
              type='number'
              className='form-control'
              id='sale-price'
              name='sale_price'
              value={form.sale_price}
              onChange={handleChange}
              step='0.01'
              required
            />
          </div>
        </div>

        <div className='d-sm-flex flex-row align-items-end col mb-2'>
          <div className='flex-fill me-sm-2 mb-3 mb-sm-0'>
            <label htmlFor='discount' className='form-label fw-bold'>
              Discount
            </label>
            <div className='input-group input-group-sm'>
              <span className='input-group-text'>%</span>
              <input
                type='number'
                className='form-control form-control-sm'
                id='discount'
                name='discount'
                value={form.discount}
                onChange={handleChange}
                step='0.01'
                required
              />
            </div>
          </div>
          <div className='flex-fill'>
            <label htmlFor='final-sale-price' className='form-label fw-bold'>
              Final Sale Price
            </label>
            <div className='input-group input-group-sm'>
              <span className='input-group-text'>RS</span>
              <input
                type='number'
                className='form-control form-control-sm'
                id='final-sale-price'
                value={finalSalePrice() ? numericString(finalSalePrice()) : ''}
                step='0.01'
                readOnly
                required
              />
            </div>
          </div>
        </div>
        <div className='col d-sm-flex '>
          <div className='flex-grow-1 mb-3 mb-sm-0 me-sm-2'>
            <label htmlFor='quantity' className='form-label fw-bold'>
              Current Stock
            </label>
            <input
              type='number'
              className='form-control form-control-sm'
              id='quantity'
              name='quantity'
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className='flex-grow-1'>
            <label htmlFor='alert_quantity' className='form-label fw-bold'>
              Alert Quantity
            </label>
            <input
              type='number'
              className='form-control form-control-sm'
              id='alert_quantity'
              name='alert_quantity'
              value={form.alert_quantity}
              min='0'
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className='flex-grow-1 mb-4'>
        <label htmlFor='description' className='form-label fw-bold'>
          Description
        </label>
        <textarea
          className='form-control'
          id='description'
          name='description'
          value={form.description}
          onChange={handleChange}
        >
          {' '}
        </textarea>
      </div>

      <div className='d-sm-flex mb-3'>
        <button
          type='submit'
          className='btn btn-primary flex-grow-1 mb-2 mb-sm-0'
        >
          {updateMode() ? 'Update' : 'Add'}
        </button>
        <Link to='/products' className='btn btn-danger flex-grow-1 ms-sm-3'>
          Cancel
        </Link>
      </div>
      {error.show && <FormError msg={error.msg} />}
    </form>
  );
}

export default ProductForm;
