import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { request_delete_customer } from '../../actions/customers/customers-actions';
import Paginaton from '../common/pagination/Pagination';
import RowsPerPage from '../common/rows-per-page/RowsPerPage';
import CustomersTable from './table/CustomersTable';
import withCleaner from '../hocs/withCleaner';
import { defaultCleanupFunctions } from '../../utils/util_structures';

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

  return (
    <div className='main__content main__content--customers'>
      <Link
        className='btn btn-primary px-3 py-2 d-flex align-items-center add-btn'
        to='/customers/add'
      >
        <span className='material-icons me-1'> add </span> New Customer
      </Link>

      <section className='mt-5 border'>
        <div className='d-flex justify-content-between bg-light py-2 px-3 border-bottom'>
          <h3 className='fw-normal'> Customers </h3> <RowsPerPage />
        </div>
        <CustomersTable />
      </section>
      <Paginaton totalItems={customers.length} />
    </div>
  );
}

export default withCleaner(Customers, defaultCleanupFunctions);
