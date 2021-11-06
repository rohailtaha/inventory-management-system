import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { hide_delete_confirmation } from '../../actions/delete-confirmation/delete-confirmation-actions';
import {
  request_delete_purchase,
  request_fetch_purchases,
} from '../../actions/purchases/purchases-actions';
import { hide_success_message } from '../../actions/success-message/success-message-actions';
import PurchasesTable from './table/PurchasesTable';

function Purchases() {
  const dispatch = useDispatch();
  const [fetched, deleteConfirmation] = useSelector(state => [
    state.purchases.fetched,
    state.deleteConfirmation,
  ]);

  useEffect(() => {
    if (!fetched) dispatch(request_fetch_purchases());
  }, []);

  useEffect(() => {
    if (deleteConfirmation.confirm)
      dispatch(request_delete_purchase(deleteConfirmation.deleteID));
  }, [deleteConfirmation.confirm]);

  useEffect(() => cleanup, []);

  const cleanup = () => {
    dispatch(hide_success_message());
    dispatch(hide_delete_confirmation());
  };

  return (
    <div className='main__content main__content--suppliers'>
      <div className='d-xl-flex align-items-center'>
        <Link
          className='btn btn-primary px-3 py-2 d-flex align-items-center add-btn'
          to='/add-purchase'
        >
          <span className='material-icons me-1'> add </span> New Purchase
        </Link>
      </div>

      <section className='mt-5 table-container'>
        <div className='card'>
          <div className='card-header fs-2'>Purchases</div>
          <div className='card-body'>
            <div className='table-responsive'>
              <PurchasesTable />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Purchases;
