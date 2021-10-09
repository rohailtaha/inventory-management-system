import { Fragment } from "react";
import { Route } from "react-router";
import Purchases from '../../components/purchases-page/Purchases';
import AddPurchase from '../../components/purchases-page/purchase/add purchase/AddPurchase';
import EditPurchase from '../../components/purchases-page/purchase/edit purchase/EditPurchase';

function PurchasesRouter() {
  return (
    <Fragment>
      <Route path='/purchases'>
        <Purchases />
      </Route>
      <Route path='/edit_purchase'>
        <EditPurchase />
      </Route>
      <Route path='/add_purchase'>
        <AddPurchase />
      </Route>
    </Fragment>
  );
}

export default PurchasesRouter;
