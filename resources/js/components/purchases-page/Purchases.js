import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { request_delete_purchase } from '../../actions/purchases/purchases-actions';
import { defaultCleanupFunctions } from '../../utils/util_structures';
import Paginaton from '../common/pagination/Pagination';
import RowsPerPage from '../common/rows-per-page/RowsPerPage';
import PurchasesTable from './table/PurchasesTable';
import withCleaner from '../hocs/withCleaner';

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
        <div className='d-flex justify-content-between bg-light py-2 px-3 border-bottom'>
          <h3 className='fw-normal'> Purchases </h3> <RowsPerPage />
        </div>
        <PurchasesTable />
      </section>
      <Paginaton totalItems={purchases.length} />
    </div>
  );
}

export default withCleaner(Purchases, defaultCleanupFunctions);
