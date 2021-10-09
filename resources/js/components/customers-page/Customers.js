import { Link } from 'react-router-dom';
import CustomersTable from './table/CustomersTable';

function Customers() {
  return (
    <div className='main__content main__content--customers'>
      <Link className='btn btn-primary me-5 px-3 py-2' to='/add_customer'>
        <i className='fas fa-plus me-2'></i> New Customer
      </Link>

      <section className='mt-5'>
        <div className='card'>
          <div className='card-header fs-2'>Customers</div>
          <div className='card-body'>
            <div className='table-responsive'>
              <CustomersTable />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Customers;
