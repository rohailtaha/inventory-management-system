import { Fragment } from 'react';
import { Route } from 'react-router';
import Categories from '../../components/categories-page/Categories';
import useCategories from '../../hooks/useCategories';

function CategoriesRouter() {
  const [, fetched] = useCategories();

  const fetchedRequiredResources = () => fetched;

  return (
    <Fragment>
      {fetchedRequiredResources() && (
        <Fragment>
          <Route path='/categories' exact>
            <Categories />
          </Route>
          <Route path='/categories/:id/edit' exact>
            <Categories />
          </Route>
        </Fragment>
      )}
    </Fragment>
  );
}

export default CategoriesRouter;
