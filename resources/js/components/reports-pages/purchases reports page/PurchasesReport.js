import { Fragment } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset_pagination } from '../../../actions/pagination/pagination-actions';
import { request_fetch_purchases } from '../../../actions/purchases/purchases-actions';
import { getDate } from '../../../utils/utility_functions';
import { dateRangeTypes } from '../../../utils/util_structures';
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

  const handleClick = () => window.print();

  useEffect(() => {
    if (!fetched) dispatch(request_fetch_purchases());
  }, []);

  useEffect(() => cleanup, []);

  const cleanup = () => {
    dispatch(reset_pagination());
  };
  return (
    <Fragment>
      {fetched && (
        <div className='main__content main__content--purchases-report'>
          <PurchasesReportHeader />

          <PurchasesReportForm />
          <section className='mt-5 table-container'>
            <div className='card'>
              <div className='card-header d-flex justify-content-between align-items-center'>
                <RowsPerPage />
                <button
                  type='button'
                  onClick={handleClick}
                  className='btn btn--print-report d-flex align-items-center bg-primary text-white'
                  data-bs-toggle='tooltip'
                  data-bs-placement='top'
                  title='Print'
                >
                  <span className='me-2'> Print </span>
                  <span className='material-icons'>print</span>
                </button>
              </div>
              <div className='card-body'>
                <div className='table-responsive'>
                  <PurchasesReportTable purchases={getPurchases()} />
                </div>
              </div>
            </div>
            <Paginaton totalItems={getPurchases().length} />
          </section>
        </div>
      )}
    </Fragment>
  );
}

export default PurchasesReport;
