import { Fragment } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  display_all_items_on_single_page,
  reset_pagination,
  set_items_per_page,
} from '../../../actions/pagination/pagination-actions';
import { request_fetch_purchases } from '../../../actions/purchases/purchases-actions';
import { getDate } from '../../../utils/utility_functions';
import {
  dateRangeTypes,
  defaultRowsCountPerPage,
} from '../../../utils/util_structures';
import RowsPerPage from '../../common/rows-per-page/RowsPerPage';
import Paginaton from '../../common/pagination/Pagination';
import PurchasesReportForm from './form/PurchasesReportForm';
import PurchasesReportHeader from './report header/PurchasesReportHeader';
import PurchasesReportTable from './table/PurchasesReportTable';

function PurchasesReport() {
  const [fetched, report, purchases] = useSelector(state => [
    state.purchases.fetched,
    state.purchases.report,
    state.purchases.list,
  ]);

  const dispatch = useDispatch();

  const getPurchases = () => {
    if (report.dateRangeType === dateRangeTypes.ALL_TIME) return purchases;
    return purchases.filter(
      purchase =>
        getDate(purchase.created_at) >= report.startDate &&
        getDate(purchase.created_at) <= report.endDate
    );
  };

  const handleClick = async () => {
    document.querySelector('.header').classList.remove('no-print');
    await dispatch(display_all_items_on_single_page(getPurchases().length));
    window.print();
    dispatch(set_items_per_page(defaultRowsCountPerPage));
  };

  useEffect(() => {
    if (!fetched) dispatch(request_fetch_purchases());
  }, []);

  useEffect(() => cleanup, []);

  const cleanup = () => dispatch(reset_pagination());

  return (
    <Fragment>
      {fetched && (
        <div className='main__content main__content--purchases-report'>
          <PurchasesReportHeader />

          <PurchasesReportForm />
          <section className='mt-5 border'>
            <div className='d-flex justify-content-between bg-light py-2 px-3 border-bottom'>
              <button
                type='button'
                onClick={handleClick}
                className='btn btn-sm btn--print-report d-flex align-items-center bg-primary text-white'
                data-bs-toggle='tooltip'
                data-bs-placement='top'
                title='Print'
              >
                <span className='me-2'> Print </span>
                <span className='material-icons'>print</span>
              </button>
              <RowsPerPage />
            </div>
            <PurchasesReportTable purchases={getPurchases()} />
          </section>
          <Paginaton totalItems={getPurchases().length} />
        </div>
      )}
    </Fragment>
  );
}

export default PurchasesReport;
