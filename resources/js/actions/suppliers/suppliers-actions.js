import axios from 'axios';
import { SERVER_ERROR } from '../../utils/util_structures';
import actionTypes from '../action-types';
import { hide_delete_confirmation } from '../delete-confirmation/delete-confirmation-actions';
import { load, stopLoading } from '../load/load';
import { request_fetch_some_purchases } from '../purchases/purchases-actions';
import { show_success_message } from '../success-message/success-message-actions';

const SUCCESSFULL_CREATE_MSG = 'Supplier added.';
const SUCCESSFULL_UPDATE_MSG = 'Supplier updated.';
const SUCCESSFULL_DELETE_MSG = 'Supplier deleted.';

export const request_fetch_suppliers = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/suppliers');
      if (response.data.status === 'OK') {
        return dispatch(set_suppliers(response.data.suppliers));
      } else {
        alert(response.data.error.msg);
      }
    } catch (error) {
      alert(SERVER_ERROR);
    }
  };
};

const set_suppliers = suppliers => ({
  type: actionTypes.SET_SUPPLIERS,
  payload: suppliers,
});

export const request_create_supplier = supplier => {
  return async dispatch => {
    try {
      dispatch(load());
      const response = await axios.post('/api/suppliers', supplier);
      if (response.data.status === 'OK') {
        dispatch(create_supplier(response.data.supplier));
        dispatch(hide_error());
        dispatch(show_success_message(SUCCESSFULL_CREATE_MSG));
      } else {
        dispatch(show_error(response.data.error.msg));
      }
    } catch (error) {
      error.response.data.error
        ? dispatch(show_error(error.response.data.error.msg))
        : dispatch(show_error(SERVER_ERROR));
    } finally {
      dispatch(stopLoading());
    }
  };
};

const create_supplier = supplier => ({
  type: actionTypes.CREATE_SUPPLIER,
  payload: supplier,
});

export const request_update_supplier = (supplier, id) => {
  return async dispatch => {
    try {
      dispatch(load());
      const response = await axios.put(`/api/suppliers/${id}`, supplier);
      if (response.data.status === 'OK') {
        dispatch(update_supplier(response.data.supplier));
        dispatch(hide_error());
        dispatch(show_success_message(SUCCESSFULL_UPDATE_MSG));
      } else {
        dispatch(show_error(response.data.error.msg));
      }
    } catch (error) {
      error.response.data.error
        ? dispatch(show_error(error.response.data.error.msg))
        : dispatch(show_error(SERVER_ERROR));
    } finally {
      dispatch(stopLoading());
    }
  };
};

const update_supplier = supplier => ({
  type: actionTypes.UPDATE_SUPPLIER,
  payload: supplier,
});

export const request_delete_supplier = id => {
  return async dispatch => {
    dispatch(hide_delete_confirmation());
    dispatch(load());
    try {
      const response = await axios.delete(`/api/suppliers/${id}`);
      if (response.data.status === 'OK') {
        dispatch(show_success_message(SUCCESSFULL_DELETE_MSG));
        dispatch(delete_supplier(response.data.id));
        dispatch(request_fetch_some_purchases(response.data.purchases));
      } else {
        alert(SERVER_ERROR);
      }
    } catch (error) {
      alert(SERVER_ERROR);
    } finally {
      dispatch(stopLoading());
    }
  };
};

const delete_supplier = id => ({
  type: actionTypes.DELETE_SUPPLIER,
  payload: {
    id,
  },
});

export const sort_suppliers = (key, order) => ({
  type: actionTypes.SORT_SUPPLIERS,
  payload: {
    key,
    order,
  },
});

export const resort_suppliers = () => ({
  type: actionTypes.RESORT_SUPPLIERS,
});

export const show_error = msg => ({
  type: actionTypes.SHOW_SUPPLIER_ERROR,
  payload: new Error(msg),
});

export const hide_error = () => ({
  type: actionTypes.HIDE_SUPPLIER_ERROR,
});
