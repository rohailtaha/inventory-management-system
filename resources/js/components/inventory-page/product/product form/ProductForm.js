import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useState } from 'react/cjs/react.development';
import {
  create_product,
  update_product,
} from '../../../../actions/products/products-actions';
import { discount, isEmpty } from '../../../../utils/utility_functions';
import FormError from '../../../common/form-error/FormError';
import Category from '../product category option/Category';

function ProductForm({ mode }) {
  const [products, categories, error, loading, successMessage] = useSelector(
    state => [
      state.products.list,
      state.categories.list,
      state.products.error,
      state.loading,
      state.successMessage,
    ]
  );

  const [form, setForm] = useState({
    barcode: '',
    name: '',
    category: categories[0].name,
    description: '',
    quantity: '1',
    alert_quantity: '',
    purchase_price: '',
    sale_price: '',
    discount: '0',
  });
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (updateMode()) {
      const product = getProduct(id);
      setForm({
        barcode: product.barcode,
        name: product.name,
        category: product.category,
        description: product.description,
        quantity: product.quantity.toString(),
        alert_quantity: product.alert_quantity.toString(),
        purchase_price: product.purchase_price.toString(),
        sale_price: product.sale_price.toString(),
        discount: product.discount.toString(),
      });
    }
  }, []);

  const updateMode = () => mode === 'UPDATE';
  const getProduct = id =>
    products.find(product => product.id === parseInt(id));

  const finalSalePrice = () => {
    if (!isEmpty(form.sale_price) && !isEmpty(form.discount)) {
      const finalSalePrice =
        parseFloat(form.sale_price).toFixed(2) -
        discount(form.sale_price, form.discount);
      return parseFloat(finalSalePrice.toFixed(2));
    }
    return '';
  };

  const handleChange = event => {
    const { name, value } = event.target;

    setForm(form => ({
      ...form,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    updateMode()
      ? dispatch(update_product(dataWithCorrectFormats(), id))
      : dispatch(create_product(dataWithCorrectFormats(), id));
  };

  const dataWithCorrectFormats = () => {
    return {
      barcode: form.barcode,
      name: form.name,
      category: form.category,
      description: form.description,
      quantity: parseInt(form.quantity),
      alert_quantity: parseInt(form.alert_quantity),
      purchase_price: parseFloat(form.purchase_price),
      sale_price: parseFloat(form.sale_price),
      discount: parseFloat(form.discount),
      final_sale_price: parseFloat(finalSalePrice()),
    };
  };

  useEffect(() => {
    if (successMessage.show && !updateMode()) resetForm();
  }, [successMessage.show]);

  const resetForm = () => {
    setForm({
      barcode: '',
      name: '',
      category: categories[0].name,
      description: '',
      quantity: '1',
      alert_quantity: '',
      purchase_price: '',
      sale_price: '',
      discount: '0',
    });
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
            <Category name={category.name} key={category.id} />
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
                value={finalSalePrice()}
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
              Opening Stock
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
        <Link to='/inventory' className='btn btn-danger flex-grow-1 ms-sm-3'>
          Cancel
        </Link>
      </div>
      {error.show && <FormError msg={error.msg} />}
    </form>
  );
}

export default ProductForm;
