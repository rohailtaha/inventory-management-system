import { Fragment } from 'react';
import { Route, Switch } from 'react-router';
import Customers from '../../components/customers-page/Customers';
import AddCustomer from '../../components/customers-page/customer/add customer/AddCustomer';
import EditCustomer from '../../components/customers-page/customer/edit customer/EditCustomer';
import { request_fetch_customers } from '../../actions/customers/customers-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function CustomersRouter() {
  const [fetched] = useSelector(state => [state.customers.fetched]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) dispatch(request_fetch_customers());
  }, []);

  const fetchedRequiredResources = () => fetched;
  return (
    <Fragment>
      {fetchedRequiredResources() && (
        <Fragment>
          <Route path='/customers' exact>
            <Customers />
          </Route>
          <Route path='/customers/add' exact>
            <AddCustomer />
          </Route>
          <Route path='/customers/:id/edit' exact>
            <EditCustomer />
          </Route>
        </Fragment>
      )}
    </Fragment>
  );
}

export default CustomersRouter;
