import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { request_delete_sale } from '../../actions/sales/sales-actions';
import Paginaton from '../common/pagination/Pagination';
import RowsPerPage from '../common/rows-per-page/RowsPerPage';
import SalesTable from './table/SalesTable';
import withCleaner from '../hocs/withCleaner';
import { defaultCleanupFunctions } from '../../utils/util_structures';

function Sales() {
  const dispatch = useDispatch();
  const [deleteConfirmation, sales] = useSelector(state => [
    state.deleteConfirmation,
    state.sales.list,
  ]);

  useEffect(() => {
    if (deleteConfirmation.confirm)
      dispatch(request_delete_sale(deleteConfirmation.deleteID));
  }, [deleteConfirmation.confirm]);

  return (
    <div className='main__content main__content--sales'>
      <div className='d-xl-flex align-items-center'>
        <Link
          className='btn btn-primary px-3 py-2 d-flex align-items-center add-btn'
          to='/sales/add'
        >
          <span className='material-icons me-1'> add </span> New Sale
        </Link>
      </div>

      <section className='mt-5 border'>
        <div className='d-flex justify-content-between bg-light py-2 px-3 border-bottom'>
          <h3 className='fw-normal'> Sales </h3> <RowsPerPage />
        </div>
        <SalesTable />
      </section>
      <Paginaton totalItems={sales.length} />
    </div>
  );
}

export default withCleaner(Sales, defaultCleanupFunctions);
