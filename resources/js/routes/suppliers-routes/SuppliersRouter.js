import { Fragment } from "react";
import { Route } from "react-router";
import Suppliers from '../../components/suppliers-page/Suppliers'
import AddSupplier from '../../components/suppliers-page/supplier/add supplier/AddSupplier'
import EditSupplier from '../../components/suppliers-page/supplier/edit supplier/EditSupplier'

function SuppliersRouter() {
  return (
    <Fragment>
      <Route path='/suppliers'>
        <Suppliers />
      </Route>
      <Route path='/add_supplier'>
        <AddSupplier />
      </Route>
      <Route path='/edit_supplier'>
        <EditSupplier />
      </Route>
    </Fragment>
  );
}

export default SuppliersRouter;
