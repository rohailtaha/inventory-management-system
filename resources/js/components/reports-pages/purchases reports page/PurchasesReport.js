import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset_pagination } from '../../../actions/pagination/pagination-actions';
import { dateRangeTypes } from '../../../utils/util_structures';
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
        purchase.date >= report.startDate && purchase.date <= report.endDate
    );
  };

  const handleClick = () => window.print();

  useEffect(() => cleanup, []);

  const cleanup = () => {
    dispatch(reset_pagination());
  };
  return (
    <div className='main__content main__content--purchases-report'>
      <PurchasesReportHeader />

      <PurchasesReportForm />
      <section className='mt-5 table-container'>
        <div className='card'>
          <div className='card-header fs-2 d-flex justify-content-between align-items-center'>
            <span className='purchases-h'> Purchases Report </span>
            <button
              type='button'
              onClick={handleClick}
              className='btn btn--print-report'
              data-bs-toggle='tooltip'
              data-bs-placement='top'
              title='Print'
            >
              <span className='material-icons'>print</span>
            </button>
          </div>
          <div className='card-body'>
            <div className='table-responsive'>
              <PurchasesReportTable purchases={getPurchases()} />
            </div>
          </div>
        </div>
        {fetched && <Paginaton totalItems={getPurchases().length} />}
      </section>
    </div>
  );
}

export default PurchasesReport;
