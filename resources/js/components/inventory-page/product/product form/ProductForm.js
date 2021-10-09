import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useState } from 'react/cjs/react.development';
import {
  create_product,
  update_product,
} from '../../../../actions/products/products-actions';
import { getDiscount, isEmpty } from '../../../../utils/utility_functions';
import FormError from '../../../common/form-error/FormError';
import Spinner from '../../../common/spinner/Spinner';
import SuccessModal from '../../../common/success-modal/SuccessModal';
import Category from '../product category option/Category';

function ProductForm({ mode }) {
  const [form, setForm] = useState({
    barcode: '',
    name: '',
    category: 'Home Appliances',
    description: '',
    quantity: '1',
    alert_quantity: '',
    purchase_price: '',
    sale_price: '',
    discount: '0',
    final_sale_price: '',
  });
  const { id } = useParams();

  const [products, error, loading, successMessage] = useSelector(state => [
    state.products.list,
    state.products.error,
    state.loading,
    state.successMessage,
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (updateMode()) {
      const product = getProduct(id);
      setForm({
        barcode: product.barcode,
        name: product.name,
        category: product.category,
        description: product.description,
        quantity: product.quantity,
        alert_quantity: product.alert_quantity,
        purchase_price: product.purchase_price,
        sale_price: product.sale_price,
        discount: product.discount,
        final_sale_price: product.final_sale_price,
      });
    }
  }, []);

  const updateMode = () => mode === 'UPDATE';
  const getProduct = id =>
    products.find(product => product.id === parseInt(id));

  useEffect(() => {
    if (!isEmpty(form.sale_price) && !isEmpty(form.discount)) {
      setForm(form => ({
        ...form,
        final_sale_price: (
          form.sale_price - getDiscount(form.sale_price, form.discount)
        ).toString(),
      }));
    }
  }, [form.sale_price, form.discount]);

  useEffect(() => {
    if (successMessage.show) resetForm();
  }, [successMessage.show]);

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
      final_sale_price: parseFloat(form.final_sale_price),
    };
  };

  const resetForm = () => {
    setForm({
      barcode: '',
      name: '',
      category: 'Home Appliances',
      description: '',
      quantity: '1',
      alert_quantity: '',
      purchase_price: '',
      sale_price: '',
      discount: '0',
      final_sale_price: '',
    });
  };

  return (
    <Fragment>
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
                  name='final_sale_price'
                  value={form.final_sale_price}
                  onChange={handleChange}
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
            {mode === 'CREATE' ? 'Add' : 'Update'} Product
          </button>
          <Link to='/inventory' className='btn btn-danger flex-grow-1 ms-sm-3'>
            Cancel
          </Link>
        </div>
        {error.show && <FormError msg={error.msg} />}
      </form>
      {successMessage.show && <SuccessModal msg={successMessage.text} />}
      {loading && <Spinner />}
    </Fragment>
  );
}

const categories = [
  { id: 2, name: 'Home Appliances' },
  { id: 3, name: 'bakery' },
  { id: 4, name: 'Games & Movies' },
];

export default ProductForm;
