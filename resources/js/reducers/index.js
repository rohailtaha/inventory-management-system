import { combineReducers } from 'redux';
import authenticationReducer from './authentication-reducer/authentication-reducer';
import userReducer from './user-reducer/user-reducer';
import sidebarReducer from './sidebar-reducer/sidebar-reducer';
import usersReducer from './users-reducer/users-reducer';
import successMessageReducer from './success-message-reducer.js/success-message-reducer';
import errorsReducer from './errors-reducer/errors-reducer';
import loadReducer from './load-reducer/load-reducer';
import confirmationMessageReducer from './confirmation-message-reducer/confirmation-message-reducer';
import productsReducer from './products/products-reducer';
import categoriesReducer from './categories-reducer/categories-reducer';

const allReducers = combineReducers({
  sidebarOpen: sidebarReducer,
  loggedin: authenticationReducer,
  user: userReducer,
  users: usersReducer,
  successMessage: successMessageReducer,
  error: errorsReducer,
  loading: loadReducer,
  confirmation:confirmationMessageReducer,
  products: productsReducer,
  categories: categoriesReducer
});

export default allReducers;
