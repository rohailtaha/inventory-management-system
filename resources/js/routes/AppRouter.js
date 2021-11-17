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

function AppRouter() {
  const userRole = useSelector(state => state.users.user.role);

  return (
    <Fragment>
      {userRole === userRoles.ADMIN && (
        <Fragment>
          <UsersRouter />
          <SuppliersRouter />
          <CategoriesRouter />
          <CustomersRouter />
        </Fragment>
      )}

      <ReportsRouter />

      <SalesRouter />

      <PurchasesRouter />

      <ProductsRouter />

      <Route path='/' exact>
        <Dashboard />
      </Route>
    </Fragment>
  );
}

export default AppRouter;
