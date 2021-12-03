import { Route, Switch } from 'react-router';

import Dashboard from '../components/dashboard-page/Dashboard';
import SuppliersRouter from './suppliers-routes/SuppliersRouter';
import ProductsRouter from './products-routes/ProductsRouter';
import CustomersRouter from './customers-routes/CustomersRouter';
import CategoriesRouter from './categories-routes/CategoriesRouter';
import ReportsRouter from './reports-routes/ReportsRouter';
import SalesRouter from './sales-routes/SalesRouter';
import UsersRouter from './users-routes/UsersRouter';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { userRoles } from '../utils/util_structures';
import PurchasesRouter from './purchases-routes/PurchasesRouter';
import Settings from '../components/settings-page/Settings';

function AppRouter() {
  const userRole = useSelector(state => state.users.user.role);
  const [loggedin] = useSelector(state => [state.loggedin]);

  return (
    <Fragment>
      {userRole === userRoles.ADMIN && (
        <Fragment>
          <Route path='/users'>
            <UsersRouter />
          </Route>
          <Route path='/categories'>
            <CategoriesRouter />
          </Route>
          <Route path='/suppliers'>
            <SuppliersRouter />
          </Route>
          <Route path='/customers'>
            <CustomersRouter />
          </Route>
        </Fragment>
      )}
      <Route path='/reports'>
        <ReportsRouter />
      </Route>

      <Route path='/sales'>
        <SalesRouter />
      </Route>

      <Route path='/purchases'>
        <PurchasesRouter />
      </Route>

      <Route path='/products'>
        <ProductsRouter />
      </Route>

      <Route path='/settings' exact>
        <Settings />
      </Route>

      <Route path='/' exact>
        <Dashboard />
      </Route>
    </Fragment>
  );
}

export default AppRouter;
