import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment } from 'react/cjs/react.development';
import { reset_pagination } from '../../../actions/pagination/pagination-actions';
import { request_fetch_sales } from '../../../actions/sales/sales-actions';
import { getDate } from '../../../utils/utility_functions';
import { dateRangeTypes } from '../../../utils/util_structures';
import Paginaton from '../../common/pagination/Pagination';
import SalesReportForm from './form/SalesReportForm';
import SalesReportHeader from './report header/SalesReportHeader';
import SalesReportTable from './table/SalesReportTable';

function SalesReport() {
  const [fetched, report, sales] = useSelector(state => [
    state.sales.fetched,
    state.sales.report,
    state.sales.list,
  ]);

  const dispatch = useDispatch();

  const getSales = () => {
    if (report.dateRangeType === dateRangeTypes.ALL_TIME) return sales;
    return sales.filter(
      sale =>
        getDate(sale.created_at) >= report.startDate &&
        getDate(sale.created_at) <= report.endDate
    );
  };

  useEffect(() => {
    if (!fetched) dispatch(request_fetch_sales());
  }, []);

  const handleClick = () => {
    document.querySelector('.header').classList.remove('no-print');
    window.print();
  };

  useEffect(() => cleanup, []);

  const cleanup = () => {
    dispatch(reset_pagination());
  };

  return (
    <Fragment>
      {fetched && (
        <div className='main__content main__content--sales-report'>
          <SalesReportHeader />

          <SalesReportForm />
          <section className='mt-5 table-container'>
            <div className='card'>
              <div className='card-header fs-2 d-flex justify-content-between align-items-center'>
                <span className='report-h'> Sales Report </span>
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
                  <SalesReportTable sales={getSales()} />
                </div>
              </div>
            </div>
            {fetched && <Paginaton totalItems={getSales().length} />}
          </section>
        </div>
      )}
    </Fragment>
  );
}

export default SalesReport;
