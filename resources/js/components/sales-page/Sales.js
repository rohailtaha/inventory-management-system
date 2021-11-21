import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { hide_delete_confirmation } from '../../actions/delete-confirmation/delete-confirmation-actions';
import { reset_pagination } from '../../actions/pagination/pagination-actions';
import { request_delete_sale } from '../../actions/sales/sales-actions';
import { hide_success_message } from '../../actions/success-message/success-message-actions';
import Paginaton from '../common/pagination/Pagination';
import SalesTable from './table/SalesTable';

function Sales() {
  const dispatch = useDispatch();
  const [deleteConfirmation, sales] = useSelector(state => [
    state.customers.fetched,
    state.deleteConfirmation,
    state.sales.list,
  ]);

  useEffect(() => {
    if (deleteConfirmation.confirm)
      dispatch(request_delete_sale(deleteConfirmation.deleteID));
  }, [deleteConfirmation.confirm]);

  useEffect(() => cleanup, []);

  const cleanup = () => {
    dispatch(hide_success_message());
    dispatch(hide_delete_confirmation());
    dispatch(reset_pagination());
  };

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

      <section className='mt-5 table-container'>
        <div className='card'>
          <div className='card-header fs-2'>Sales</div>
          <div className='card-body'>
            <div className='table-responsive'>
              <SalesTable />
            </div>
          </div>
        </div>
        <Paginaton totalItems={sales.length} />
      </section>
    </div>
  );
}

export default Sales;
