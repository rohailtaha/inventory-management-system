import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';

const initialState = {};

const store = createStore(
  allReducers,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
);

export default store;
