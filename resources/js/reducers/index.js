import { combineReducers } from 'redux';
import authenticationReducer from './authentication-reducer/authentication-reducer';
import sidebarReducer from './sidebar-reducer/sidebar-reducer';
import usersReducer from './users-reducer/users-reducer';
import successMessageReducer from './success-message-reducer.js/success-message-reducer';
import errorsReducer from './errors-reducer/errors-reducer';
import loadReducer from './load-reducer/load-reducer';
import deleteConfirmationReducer from './delete-confirmation-reducer/delete-confirmation-reducer';
import productsReducer from './products/products-reducer';
import categoriesReducer from './categories-reducer/categories-reducer';
import suppliersReducer from './suppliers-reducer/suppliers-reducer';
import customersReducer from './customers-reducer/customers-reducer';
import purchasesReducer from './purchases-reducer/purchases-reducer';
import salesReducer from './sales-reducer/sales-reducer';
import paginationReducer from './pagination-reducer/pagination-reducer';
import shopReducer from './shop-reducer/shop-reducer';

const allReducers = combineReducers({
  sidebarOpen: sidebarReducer,
  loggedin: authenticationReducer,
  pagination: paginationReducer,
  successMessage: successMessageReducer,
  error: errorsReducer,
  deleteConfirmation: deleteConfirmationReducer,
  loading: loadReducer,
  shop: shopReducer,
  users: usersReducer,
  products: productsReducer,
  categories: categoriesReducer,
  suppliers: suppliersReducer,
  customers: customersReducer,
  purchases: purchasesReducer,
  sales: salesReducer,
});

export default allReducers;
