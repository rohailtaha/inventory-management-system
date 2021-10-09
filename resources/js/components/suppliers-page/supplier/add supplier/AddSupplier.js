import SupplierForm from '../form/SupplierForm';

function AddSupplier() {
  return (
    <div className='main__content main__content--add-supplier'>
      <h1 className='mb-5'>Add New Supplier</h1>
      <div>
        <SupplierForm mode='CREATE' />
      </div>
    </div>
  );
}

export default AddSupplier;
