import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Gateway from './Gateway';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    {' '}
    <Gateway />{' '}
  </Provider>,
  document.getElementById('root')
);
