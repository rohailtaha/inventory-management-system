import PurchasesReportForm from './form/PurchasesReportForm';
import PurchasesReportHeader from './report header/PurchasesReportHeader';
import PurchasesReportTable from './table/PurchasesReportTable';

function PurchasesReport() {
  const handleClick = () => window.print();

  return (
    <div className='main__content main__content--purchases-report'>
      <PurchasesReportHeader />

      <PurchasesReportForm />
      <section className='mt-5 table-container'>
        <div className='card'>
          <div className='card-header fs-2 d-flex justify-content-between align-items-center'>
            <span className='sales-h'> Purchases Report </span>
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
              <PurchasesReportTable />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PurchasesReport;
