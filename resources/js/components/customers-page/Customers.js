import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { request_fetch_customers } from '../../actions/customers/customers-actions';
import CustomersTable from './table/CustomersTable';

function Customers() {
  const dispatch = useDispatch();
  const fetched = useSelector(state => state.customers.fetched);

  useEffect(() => {
    if (!fetched) dispatch(request_fetch_customers());
  }, []);

  return (
    <div className='main__content main__content--customers'>
      <Link
        className='btn btn-primary px-3 py-2 d-flex align-items-center add-btn'
        to='/add-customer'
      >
        <span className='material-icons me-1'> add </span> New Customer
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
