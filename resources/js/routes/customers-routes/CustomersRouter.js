import { Fragment } from "react";
import { Route } from "react-router";
import Customers from '../../components/customers-page/Customers'
import AddCustomer from '../../components/customers-page/customer/add customer/AddCustomer'
import EditCustomer from '../../components/customers-page/customer/edit customer/EditCustomer'

function CustomersRouter() {
  return (
    <Fragment>
      <Route path='/customers'>
        <Customers />
      </Route>
      <Route path='/add_customer'>
        <AddCustomer />
      </Route>
      <Route path='/edit_customer'>
        <EditCustomer />
      </Route>
    </Fragment>
  );
}

export default CustomersRouter;
