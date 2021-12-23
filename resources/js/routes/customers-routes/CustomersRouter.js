import { Fragment } from 'react';
import { Route } from 'react-router';
import Customers from '../../components/customers-page/Customers';
import AddCustomer from '../../components/customers-page/customer/add customer/AddCustomer';
import EditCustomer from '../../components/customers-page/customer/edit customer/EditCustomer';
import useCustomers from '../../hooks/useCustomers';

function CustomersRouter() {
  const [, fetched] = useCustomers();

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
