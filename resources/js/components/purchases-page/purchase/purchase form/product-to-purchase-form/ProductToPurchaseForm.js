import React from 'react';

export default function ProductToPurchaseForm() {
  const [form, setForm] = useState({
    barcode: '',
    product: '',
    per_item_cost: '',
    quantity: '',
    supplier: '',
    status: '',
  });

  const products = useSelector(state => state.products.list);
  const dispatch = useDispatch();

  const getProduct = barcode =>
    products.find(product => product.barcode === barcode);

  const totalProductCost = () => {
    if (!isEmpty(form.quantity) && !isEmpty(form.per_item_cost))
      return (parseInt(form.quantity) * parseFloat(form.per_item_cost)).toFixed(
        2
      );
    return '';
  };

  const addProductToForm = () => {
    const product = getProduct(form.barcode);
    if (product) {
      setForm(form => ({
        ...form,
        product: product.name,
        per_item_cost: product.purchase_price.toString(),
        quantity: '1',
      }));
    }
  };

  const addProductToPurchase = () => {
    dispatch(
      add_product_to_purchase({
        product: form.product,
        per_item_cost: form.per_item_cost,
        quantity: form.quantity,
        total_cost: totalProductCost(),
      })
    );
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
          name='product'
          value={form.product}
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
              value={totalProductCost()}
              required
              readOnly
            />
          </div>
        </div>
      </div>
    </form>
  );
}
