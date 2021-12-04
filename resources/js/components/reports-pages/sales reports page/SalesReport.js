import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment } from 'react/cjs/react.development';
import {
  display_all_items_on_single_page,
  reset_pagination,
  set_items_per_page,
} from '../../../actions/pagination/pagination-actions';
import { request_fetch_sales } from '../../../actions/sales/sales-actions';
import { getDate } from '../../../utils/utility_functions';
import {
  dateRangeTypes,
  defaultRowsCountPerPage,
} from '../../../utils/util_structures';
import RowsPerPage from '../../common/rows-per-page/RowsPerPage';
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

  const handleClick = async () => {
    document.querySelector('.header').classList.remove('no-print');
    await dispatch(display_all_items_on_single_page(getSales().length));
    window.print();
    dispatch(set_items_per_page(defaultRowsCountPerPage));
  };

  useEffect(() => cleanup, []);

  const cleanup = () => dispatch(reset_pagination());

  return (
    <Fragment>
      {fetched && (
        <div className='main__content main__content--sales-report'>
          <SalesReportHeader />

          <SalesReportForm />
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
            <SalesReportTable sales={getSales()} />
          </section>
          {fetched && <Paginaton totalItems={getSales().length} />}
        </div>
      )}
    </Fragment>
  );
}

export default SalesReport;
