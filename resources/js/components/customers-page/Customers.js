import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { request_delete_customer } from '../../actions/customers/customers-actions';
import { hide_delete_confirmation } from '../../actions/delete-confirmation/delete-confirmation-actions';
import { reset_pagination } from '../../actions/pagination/pagination-actions';
import { hide_success_message } from '../../actions/success-message/success-message-actions';
import Paginaton from '../common/pagination/Pagination';
import CustomersTable from './table/CustomersTable';

function Customers() {
  const [deleteConfirmation, customers] = useSelector(state => [
    state.deleteConfirmation,
    state.customers.list,
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (deleteConfirmation.confirm)
      dispatch(request_delete_customer(deleteConfirmation.deleteID));
  }, [deleteConfirmation.confirm]);

  useEffect(() => cleanup, []);

  const cleanup = () => {
    dispatch(hide_success_message());
    dispatch(hide_delete_confirmation());
    dispatch(reset_pagination());
  };

  return (
    <div className='main__content main__content--customers'>
      <Link
        className='btn btn-primary px-3 py-2 d-flex align-items-center add-btn'
        to='/customers/add'
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
        <Paginaton totalItems={customers.length} />
      </section>
    </div>
  );
}

export default Customers;
