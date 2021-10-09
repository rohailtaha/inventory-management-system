import { Fragment } from "react";
import { Route } from "react-router";
import Categories from '../../components/categories-page/Categories'

function CategoriesRouter() {
  return (
    <Fragment>
      <Route path='/edit-category/:id'>
        <Categories />
      </Route>
      <Route path='/categories'>
        <Categories />
      </Route>
    </Fragment>
  );
}

export default CategoriesRouter
