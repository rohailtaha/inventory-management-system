import axios from 'axios';
import { SERVER_ERROR } from '../../utils/util_structures';
import actionTypes from '../action-types';
import { hide_delete_confirmation } from '../delete-confirmation/delete-confirmation-actions';
import { load, stopLoading } from '../load/load';
import { show_success_message } from '../success-message/success-message-actions';

const SUCCESSFULL_CREATE_MSG = 'Product added.';
const SUCCESSFULL_UPDATE_MSG = 'Product updated.';
const SUCCESSFULL_DELETE_MSG = 'Product deleted';

export function fetch_products() {
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
      dispatch(show_error(SERVER_ERROR));
    }
  };
}

export function create_product(product) {
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
        dispatch(show_success_message(SUCCESSFULL_CREATE_MSG));
      } else {
        dispatch(show_error(response.data.error.msg));
      }
    } catch (error) {
      dispatch(show_error(SERVER_ERROR));
    } finally {
      dispatch(stopLoading());
    }
  };
}

export function update_product(product, id) {
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
        dispatch(show_success_message(SUCCESSFULL_UPDATE_MSG));
      } else {
        dispatch(show_error(response.data.error.msg));
      }
    } catch (error) {
      dispatch(show_error(SERVER_ERROR));
    } finally {
      dispatch(stopLoading());
    }
  };
}

export function request_delete_product(id) {
  return async dispatch => {
    dispatch(hide_delete_confirmation());
    dispatch(load());
    try {
      const response = await axios.delete(`/api/products/${id}`);
      if (response.data.status === 'OK') {
        dispatch(show_success_message(SUCCESSFULL_DELETE_MSG));
        dispatch(delete_product(response.data.id));
      } else {
        console.error(SERVER_ERROR);
      }
    } catch (error) {
      console.error(SERVER_ERROR);
    } finally {
      dispatch(stopLoading());
    }
  };
}

function delete_product(id) {
  return {
    type: actionTypes.DELETE_PRODUCT,
    payload: {
      id,
    },
  };
}

export function show_error(msg) {
  return {
    type: actionTypes.SHOW_PRODUCTS_ERROR,
    payload: new Error(msg),
    error: true,
  };
}

export function hide_error() {
  return {
    type: actionTypes.HIDE_PRODUCTS_ERROR,
  };
}
