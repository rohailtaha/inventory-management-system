import { Fragment } from 'react';
import { Route } from 'react-router';
import PurchasesReport from '../../components/reports-pages/purchases reports page/PurchasesReport';
import SalesReport from '../../components/reports-pages/sales reports page/SalesReport';

function ReportsRouter() {
  return (
    <Fragment>
      <Route path='/purchases-report'>
        <PurchasesReport />
      </Route>
      <Route path='/sales-report'>
        <SalesReport />
      </Route>
    </Fragment>
  );
}

export default ReportsRouter;
