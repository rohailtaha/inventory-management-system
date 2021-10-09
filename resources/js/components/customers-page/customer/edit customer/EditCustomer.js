import CustomerForm from "../form/CustomerForm";

function EditCustomer() {
  return (
    <div className='main__content main__content--edit-customer'>
      <h1 className='fs-2 mb-5'>Edit Customer</h1>
      <div>
        <CustomerForm mode='UPDATE' />
      </div>
    </div>
  );
}

export default EditCustomer;
