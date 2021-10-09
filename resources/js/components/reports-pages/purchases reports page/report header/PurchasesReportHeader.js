function PurchasesReportHeader() {
  return (
    <div className='text-center align-items-center report-header'>
      <span className='d-block fs-1 text-decoration-underline report-header__h'>
        Purchases Report
      </span>
      <span className='d-block fs-5 mt-2 report-header__date-range'>
        <span> {'12-09-2021'}</span> to <span>{'12-09-2021'} </span>
      </span>
    </div>
  );
}

export default PurchasesReportHeader;
