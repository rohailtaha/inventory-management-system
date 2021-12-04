import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router';
import Products from '../../components/products-page/Products';
import AddProduct from '../../components/products-page/product/add product/AddProduct';
import EditProduct from '../../components/products-page/product/edit product/EditProduct';
import { userRoles } from '../../utils/util_structures';
import { useEffect } from 'react';
import { fetch_categories } from '../../actions/categories/categories-actions';
import { fetch_products } from '../../actions/products/products-actions';

function ProductsRouter() {
  const [fetched, fetchedCategories, userRole] = useSelector(state => [
    state.products.fetched,
    state.categories.fetched,
    state.users.user.role,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) dispatch(fetch_products());
    if (!fetchedCategories) dispatch(fetch_categories());
  }, []);

  const fetchedRequiredResources = () => fetched && fetchedCategories;

  return (
    <Fragment>
      {fetchedRequiredResources() && (
        <Fragment>
          {userRole === userRoles.ADMIN && (
            <Fragment>
              <Route path='/products/add' exact>
                <AddProduct />
              </Route>
              <Route path='/products/:id/edit' exact>
                <EditProduct />
              </Route>
            </Fragment>
          )}
          <Route path='/products' exact>
            <Products />
          </Route>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ProductsRouter;
