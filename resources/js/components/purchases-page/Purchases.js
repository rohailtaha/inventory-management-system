import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { hide_delete_confirmation } from '../../actions/delete-confirmation/delete-confirmation-actions';
import { reset_pagination } from '../../actions/pagination/pagination-actions';
import { request_delete_purchase } from '../../actions/purchases/purchases-actions';
import { hide_success_message } from '../../actions/success-message/success-message-actions';
import Paginaton from '../common/pagination/Pagination';
import RowsPerPage from '../common/rows-per-page/RowsPerPage';
import PurchasesTable from './table/PurchasesTable';

function Purchases() {
  const dispatch = useDispatch();
  const [deleteConfirmation, purchases] = useSelector(state => [
    state.deleteConfirmation,
    state.purchases.list,
  ]);

  useEffect(() => {
    if (deleteConfirmation.confirm)
      dispatch(request_delete_purchase(deleteConfirmation.deleteID));
  }, [deleteConfirmation.confirm]);

  useEffect(() => cleanup, []);

  const cleanup = () => {
    dispatch(hide_success_message());
    dispatch(hide_delete_confirmation());
    dispatch(reset_pagination());
  };

  return (
    <div className='main__content main__content--purchases'>
      <div className='d-xl-flex align-items-center'>
        <Link
          className='btn btn-primary px-3 py-2 d-flex align-items-center add-btn'
          to='/purchases/add'
        >
          <span className='material-icons me-1'> add </span> New Purchase
        </Link>
      </div>

      <section className='mt-5 border'>
        <div className='d-flex mb-2 justify-content-between bg-light py-2 px-3'>
          <h3 className='fw-normal'> Purchases </h3> <RowsPerPage />
        </div>
        <PurchasesTable />
      </section>
      <Paginaton totalItems={purchases.length} />
    </div>
  );
}

export default Purchases;
