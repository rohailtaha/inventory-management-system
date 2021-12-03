import { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import { fetch_categories } from '../../actions/categories/categories-actions';
import Categories from '../../components/categories-page/Categories';

function CategoriesRouter() {
  const [fetched] = useSelector(state => [state.categories.fetched]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) dispatch(fetch_categories());
  }, []);

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
