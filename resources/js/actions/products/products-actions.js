import axios from 'axios';
import actionTypes from '../action-types';
import { load, stopLoading } from '../load/load';
import { show_success_message } from '../success-message.js/success-message-actions';

function fetch_products() {
  return async dispatch => {
    try {
      const response = await axios.get('/api/products');
      if (response.data.status === 'OK') {
        dispatch({
          type: actionTypes.FETCH_PRODUCTS,
          payload: response.data.products,
        });
      } else {
        dispatch(show_error(response.data.error.msg));
      }
    } catch (error) {
      dispatch(show_error('There was an error connecting to the server'));
    }
  };
}

function create_product(product) {
  return async dispatch => {
    try {
      dispatch(load());
      const response = await axios.post('/api/products', product);
      if (response.data.status === 'OK') {
        dispatch({
          type: actionTypes.CREATE_PRODUCT,
          payload: response.data.product,
        });
        dispatch(hide_error());
        dispatch(show_success_message('Product saved successfully'))
      } else {
        dispatch(show_error(response.data.error.msg));
      }
    } catch (error) {
      dispatch(show_error('There was an error connecting to the server'));
    } finally {
      dispatch(stopLoading());
    } 
  };
}

function update_product(product, id) {
  return async dispatch => {
    try {
      dispatch(load());
      const response = await axios.put(`/api/products/${id}`, product);
      if (response.data.status === 'OK') {
        dispatch({
          type: actionTypes.UPDATE_PRODUCT,
          payload: response.data.product,
        });
        dispatch(hide_error());
        dispatch(show_success_message('Product updated.'));
      } else {
        dispatch(show_error(response.data.error.msg));
      }
    } catch (error) {
      dispatch(show_error('There was an error connecting to the server'));
    } finally {
      dispatch(stopLoading());
    } 
  };
}

function delete_product(id) {
  return dispatch => {
    axios
      .delete(`/api/products/${id}`)
      .then(res =>
        dispatch({
          type: actionTypes.DELETE_PRODUCT,
          payload: {
            id: res.data.id,
          },
        })
      )
      .catch(error => dispatch(show_error(error.response.data.error.msg)));
  };
}

function show_error(msg) {
  return {
    type: actionTypes.SHOW_PRODUCTS_ERROR,
    payload: new Error(msg),
    error: true,
  };
}

function hide_error() {
  return {
    type: actionTypes.HIDE_PRODUCTS_ERROR,
  };
}

export { fetch_products, create_product, update_product, delete_product };
