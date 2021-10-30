import { Fragment } from 'react';
import { Route } from 'react-router';
import Sales from '../../components/sales-page/Sales';
import AddSale from '../../components/sales-page/sale/add sale/AddSale';
import EditSale from '../../components/sales-page/sale/edit sale/EditSale';

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
    </Fragment>
  );
}

export default SalesRouter;
