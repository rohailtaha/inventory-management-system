import { Fragment } from 'react';
import { Route, Switch } from 'react-router';
import Sales from '../../components/sales-page/Sales';
import AddSale from '../../components/sales-page/sale/add sale/AddSale';
import EditSale from '../../components/sales-page/sale/edit sale/EditSale';
import SaleInvoice from '../../components/sales-page/sale/sale-invoice/SaleInvoice';
import useSales from '../../hooks/useSales';
import useCustomers from '../../hooks/useCustomers';
import useProducts from '../../hooks/useProducts';

function SalesRouter() {
  const [, fetched] = useSales();
  const [, fetchedProducts] = useProducts();
  const [, fetchedCustomers] = useCustomers();
  const fetchedRequiredResources = () =>
    fetched && fetchedProducts && fetchedCustomers;

  return (
    <Fragment>
      {fetchedRequiredResources() && (
        <Switch>
          <Route path='/sales' exact>
            <Sales />
          </Route>
          <Route path='/sales/add' exact>
            <AddSale />
          </Route>
          <Route path='/sales/:id' exact>
            <SaleInvoice />
          </Route>
          <Route path='/sales/:id/edit' exact>
            <EditSale />
          </Route>
        </Switch>
      )}
    </Fragment>
  );
}

export default SalesRouter;
