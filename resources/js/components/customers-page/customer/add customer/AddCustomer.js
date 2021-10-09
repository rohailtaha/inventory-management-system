import CustomerForm from '../form/CustomerForm';

function AddCustomer() {
  return (
    <div className='main__content main__content--add-customer'>
      <h1 className='fs-2 mb-5'>Add New Customer</h1>
      <div>
        <CustomerForm mode='CREATE' />
      </div>
    </div>
  );
}

export default AddCustomer;
