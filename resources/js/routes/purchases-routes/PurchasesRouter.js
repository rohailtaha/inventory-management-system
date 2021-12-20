import { Route, Switch } from 'react-router';
import Purchases from '../../components/purchases-page/Purchases';
import AddPurchase from '../../components/purchases-page/purchase/add purchase/AddPurchase';
import EditPurchase from '../../components/purchases-page/purchase/edit purchase/EditPurchase';
import PurchaseInvoice from '../../components/purchases-page/purchase/purchase-invoice/PurchaseInvoice';
import { Fragment } from 'react';
import useSuppliers from '../../hooks/useSuppliers';
import usePurchases from '../../hooks/usePurchases';
import useProducts from '../../hooks/useProducts';

function PurchasesRouter() {
  const [, fetched] = usePurchases();
  const [, fetchedProducts] = useProducts();
  const [, fetchedSuppliers] = useSuppliers();

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
