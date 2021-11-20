import { Fragment } from 'react';
import { Route } from 'react-router';
import Sales from '../../components/sales-page/Sales';
import AddSale from '../../components/sales-page/sale/add sale/AddSale';
import EditSale from '../../components/sales-page/sale/edit sale/EditSale';
import SaleInvoice from '../../components/sales-page/sale/sale-invoice/SaleInvoice';

function SalesRouter() {
  return (
    <Fragment>
      <Route path='/sales'>
        <Sales />
      </Route>
      <Route path='/add-sale'>
        <AddSale />
      </Route>
      <Route path='/edit-sale/:id'>
        <EditSale />
      </Route>
      <Route path='/view-sale/:id'>
        <SaleInvoice />
      </Route>
    </Fragment>
  );
}

export default SalesRouter;
