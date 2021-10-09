import SupplierForm from "../form/SupplierForm";

function EditSupplier() {
  return (
    <div className='main__content main__content--edit-supplier'>
      <h1 className='mb-5'>Update Supplier</h1>
      <div>
        <SupplierForm mode='UPDATE' />
      </div>
    </div>
  );
}

export default EditSupplier
