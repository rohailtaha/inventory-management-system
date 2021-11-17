import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router';
import Inventory from '../../components/inventory-page/Inventory';
import AddProduct from '../../components/inventory-page/product/add product/AddProduct';
import EditProduct from '../../components/inventory-page/product/edit product/EditProduct';
import { userRoles } from '../../utils/util_structures';

function ProductsRouter() {
  const userRole = useSelector(state => state.users.user.role);

  return (
    <Fragment>
      {userRole === userRoles.ADMIN && (
        <Fragment>
          <Route path='/add-product'>
            <AddProduct />
          </Route>
          <Route path='/edit-product/:id'>
            <EditProduct />
          </Route>
        </Fragment>
      )}

      <Route path='/inventory'>
        <Inventory />
      </Route>
    </Fragment>
  );
}

export default ProductsRouter;
