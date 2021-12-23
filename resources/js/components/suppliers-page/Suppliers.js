import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { request_delete_supplier } from '../../actions/suppliers/suppliers-actions';
import Paginaton from '../common/pagination/Pagination';
import RowsPerPage from '../common/rows-per-page/RowsPerPage';
import SuppliersTable from './table/SuppliersTable';
import withCleaner from '../hocs/withCleaner';
import { defaultCleanupFunctions } from '../../utils/util_structures';

function Suppliers() {
  const [deleteConfirmation, suppliers] = useSelector(state => [
    state.deleteConfirmation,
    state.suppliers.list,
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (deleteConfirmation.confirm)
      dispatch(request_delete_supplier(deleteConfirmation.deleteID));
  }, [deleteConfirmation.confirm]);

  return (
    <div className='main__content main__content--suppliers'>
      <div className='d-xl-flex align-items-center'>
        <Link
          className='btn btn-primary px-3 py-2 d-flex align-items-center add-btn'
          to='/suppliers/add'
        >
          <span className='material-icons me-1'> add </span> New Supplier
        </Link>
      </div>

      <section className='mt-5 border'>
        <div className='d-flex justify-content-between bg-light py-2 px-3 border-bottom'>
          <h3 className='fw-normal'> Suppliers </h3> <RowsPerPage />
        </div>
        <SuppliersTable />
      </section>
      <Paginaton totalItems={suppliers.length} />
    </div>
  );
}

export default withCleaner(Suppliers, defaultCleanupFunctions);
