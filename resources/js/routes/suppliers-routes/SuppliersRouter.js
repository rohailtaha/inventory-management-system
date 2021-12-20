import { Fragment } from 'react';
import { Route } from 'react-router';
import Suppliers from '../../components/suppliers-page/Suppliers';
import AddSupplier from '../../components/suppliers-page/supplier/add supplier/AddSupplier';
import EditSupplier from '../../components/suppliers-page/supplier/edit supplier/EditSupplier';
import useSuppliers from '../../hooks/useSuppliers';

function SuppliersRouter() {
  const [, fetched] = useSuppliers();
  const fetchedRequiredResources = () => fetched;

  return (
    <Fragment>
      {fetchedRequiredResources() && (
        <Fragment>
          <Route path='/suppliers' exact>
            <Suppliers />
          </Route>
          <Route path='/suppliers/add' exact>
            <AddSupplier />
          </Route>
          <Route path='/suppliers/:id/edit' exact>
            <EditSupplier />
          </Route>
        </Fragment>
      )}
    </Fragment>
  );
}

export default SuppliersRouter;
