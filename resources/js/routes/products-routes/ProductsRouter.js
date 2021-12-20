import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router';
import Products from '../../components/products-page/Products';
import AddProduct from '../../components/products-page/product/add product/AddProduct';
import EditProduct from '../../components/products-page/product/edit product/EditProduct';
import { userRoles } from '../../utils/util_structures';
import useProducts from '../../hooks/useProducts';
import useCategories from '../../hooks/useCategories';

function ProductsRouter() {
  const [userRole] = useSelector(state => [state.users.user.role]);

  const [, fetched] = useProducts();
  const [, fetchedCategories] = useCategories();

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
