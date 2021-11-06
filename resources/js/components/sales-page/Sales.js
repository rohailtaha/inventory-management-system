import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { hide_delete_confirmation } from '../../actions/delete-confirmation/delete-confirmation-actions';
import {
  request_delete_sale,
  request_fetch_sales,
} from '../../actions/sales/sales-actions';
import { hide_success_message } from '../../actions/success-message/success-message-actions';
import SalesTable from './table/SalesTable';

function Sales() {
  const dispatch = useDispatch();
  const [fetched, deleteConfirmation] = useSelector(state => [
    state.sales.fetched,
    state.deleteConfirmation,
  ]);

  useEffect(() => {
    if (!fetched) dispatch(request_fetch_sales());
  }, []);

  useEffect(() => {
    if (deleteConfirmation.confirm)
      dispatch(request_delete_sale(deleteConfirmation.deleteID));
  }, [deleteConfirmation.confirm]);

  useEffect(() => cleanup, []);

  const cleanup = () => {
    dispatch(hide_success_message());
    dispatch(hide_delete_confirmation());
  };

  return (
    <div className='main__content main__content--sales'>
      <div className='d-xl-flex align-items-center'>
        <Link
          className='btn btn-primary px-3 py-2 d-flex align-items-center add-btn'
          to='/add-sale'
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
      </section>
    </div>
  );
}

export default Sales;
