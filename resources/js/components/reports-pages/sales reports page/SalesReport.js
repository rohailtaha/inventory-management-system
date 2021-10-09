import SalesReportForm from './form/SalesReportForm';
import SalesReportHeader from './report header/SalesReportHeader';
import SalesReportTable from './table/SalesReportTable';

function SalesReport() {
  const handleClick = event => {
    window.print();
  };
  return (
    <div className='main__content main__content--sales-report'>
      <SalesReportHeader />

      <SalesReportForm />
      <section className='mt-5 table-container'>
        <div className='card'>
          <div className='card-header fs-2 d-flex justify-content-between align-items-center'>
            <span className='sales-h'> Sales Report </span>
            <button
              onClick={handleClick}
              className='btn bg-transparent border-none btn--print-report'
              data-bs-toggle='tooltip'
              data-bs-placement='top'
              title='Print'
            >
              {' '}
              <i className='fas fa-print ms-auto fs-4'></i>{' '}
            </button>
          </div>
          <div className='card-body'>
            <div className='table-responsive'>
              <SalesReportTable />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SalesReport;
