import { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import Sales from '../../components/sales-page/Sales';
import AddSale from '../../components/sales-page/sale/add sale/AddSale';
import EditSale from '../../components/sales-page/sale/edit sale/EditSale';
import SaleInvoice from '../../components/sales-page/sale/sale-invoice/SaleInvoice';
import { useDispatch, useSelector } from 'react-redux';
import { request_fetch_sales } from '../../actions/sales/sales-actions';
import { request_fetch_customers } from '../../actions/customers/customers-actions';
import { fetch_products } from '../../actions/products/products-actions';

function SalesRouter() {
  const [fetched, fetchedProducts, fetchedCustomers] = useSelector(state => [
    state.sales.fetched,
    state.products.fetched,
    state.customers.fetched,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) dispatch(request_fetch_sales());
    if (!fetchedProducts) dispatch(fetch_products());
    if (!fetchedCustomers) dispatch(request_fetch_customers());
  }, []);

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
