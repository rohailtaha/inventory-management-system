import { Fragment } from 'react';
import { Route, Switch } from 'react-router';
import Suppliers from '../../components/suppliers-page/Suppliers';
import AddSupplier from '../../components/suppliers-page/supplier/add supplier/AddSupplier';
import EditSupplier from '../../components/suppliers-page/supplier/edit supplier/EditSupplier';
import { useDispatch, useSelector } from 'react-redux';
import { request_fetch_suppliers } from '../../actions/suppliers/suppliers-actions';
import { useEffect } from 'react';

function SuppliersRouter() {
  const [fetched] = useSelector(state => [state.suppliers.fetched]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) dispatch(request_fetch_suppliers());
  }, []);

  const fetchedRequiredResources = () => fetched;

  return (
    <Fragment>
      {fetchedRequiredResources() && (
        <Switch>
          <Route path='/suppliers' exact>
            <Suppliers />
          </Route>
          <Route path='/suppliers/add' exact>
            <AddSupplier />
          </Route>
          <Route path='/suppliers/:id/edit' exact>
            <EditSupplier />
          </Route>
        </Switch>
      )}
    </Fragment>
  );
}

export default SuppliersRouter;
