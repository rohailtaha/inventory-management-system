import { Fragment } from 'react';
import { Route } from 'react-router';
import Inventory from '../../components/inventory-page/Inventory';
import AddProduct from '../../components/inventory-page/product/add product/AddProduct';
import EditProduct from '../../components/inventory-page/product/edit product/EditProduct';

function ProductsRouter() {
  return (
    <Fragment>
      <Route path='/inventory'>
        <Inventory />
      </Route>
      <Route path='/add-product'>
        <AddProduct />
      </Route>
      <Route path='/edit-product/:id'>
        <EditProduct />
      </Route>
    </Fragment>
  );
}

export default ProductsRouter;
