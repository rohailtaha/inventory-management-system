import { Route, Switch } from 'react-router';
import Purchases from '../../components/purchases-page/Purchases';
import AddPurchase from '../../components/purchases-page/purchase/add purchase/AddPurchase';
import EditPurchase from '../../components/purchases-page/purchase/edit purchase/EditPurchase';
import PurchaseInvoice from '../../components/purchases-page/purchase/purchase-invoice/PurchaseInvoice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { request_fetch_purchases } from '../../actions/purchases/purchases-actions';
import { request_fetch_suppliers } from '../../actions/suppliers/suppliers-actions';
import { fetch_products } from '../../actions/products/products-actions';
import { Fragment } from 'react';

function PurchasesRouter() {
  const dispatch = useDispatch();
  const [fetched, fetchedProducts, fetchedSuppliers] = useSelector(state => [
    state.purchases.fetched,
    state.products.fetched,
    state.suppliers.fetched,
  ]);

  useEffect(() => {
    if (!fetched) dispatch(request_fetch_purchases());
    if (!fetchedProducts) dispatch(fetch_products());
    if (!fetchedSuppliers) dispatch(request_fetch_suppliers());
  }, []);

  const fetchedRequiredResources = () =>
    fetched && fetchedProducts && fetchedSuppliers;

  return (
    <Fragment>
      {fetchedRequiredResources() && (
        <Switch>
          <Route path='/purchases' exact>
            <Purchases />
          </Route>
          <Route path='/purchases/add' exact>
            <AddPurchase />
          </Route>
          <Route path='/purchases/:id' exact>
            <PurchaseInvoice />
          </Route>
          <Route path='/purchases/:id/edit' exact>
            <EditPurchase />
          </Route>
        </Switch>
      )}
    </Fragment>
  );
}

export default PurchasesRouter;
