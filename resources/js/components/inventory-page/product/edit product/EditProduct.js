import { Link } from 'react-router-dom';
import ProductForm from '../product form/ProductForm';

function EditProduct() {
  return (
    <div className='main__content main__content--edit-product'>
      <h1 className='fs-2 mb-3'>Edit Product</h1>
      <Link to='/inventory' className='btn btn-danger'>
        {' '}
        <i className='fas fa-arrow-left me-1'> </i> Back{' '}
      </Link>
      <ProductForm mode={'UPDATE'} />
    </div>
  );
}

export default EditProduct;
