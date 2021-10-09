import ProductForm from '../product form/ProductForm';

function AddProduct() {
  return (
    <div className='main__content main__content--add-product'>
      <h1 className='fs-2 mb-5'>Add New Product</h1>
      <ProductForm mode={'CREATE'} />
    </div>
  );
}
export default AddProduct;
