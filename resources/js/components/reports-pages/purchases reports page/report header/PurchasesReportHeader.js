import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { dateRangeTypes } from '../../../../utils/util_structures';

function PurchasesReportHeader() {
  const report = useSelector(state => state.purchases.report);

  return (
    <div className='text-center align-items-center report-header'>
      <span className='d-block fs-1 text-decoration-underline report-header__h'>
        Purchases Report
      </span>
      <span className='d-block fs-5 mt-2 report-header__date-range'>
        {report.dateRangeType === dateRangeTypes.CUSTOM && (
          <Fragment>
            <span> {report.startDate}</span> to <span> {report.endDate} </span>{' '}
          </Fragment>
        )}
      </span>
    </div>
  );
}

export default PurchasesReportHeader;
