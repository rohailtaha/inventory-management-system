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

export function request_fetch_suppliers() {
  return async dispatch => {
    try {
      const response = await axios.get('/api/suppliers');
      if (response.data.status === 'OK') {
        return dispatch(set_suppliers(response.data.suppliers));
      } else {
        dispatch(show_error(response.data.error.msg));
      }
    } catch (error) {
      dispatch(show_error(SERVER_ERROR));
    }
  };
}

function set_suppliers(suppliers) {
  return {
    type: actionTypes.SET_SUPPLIERS,
    payload: suppliers,
  };
}

export function request_create_supplier(supplier) {
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
      dispatch(show_error(SERVER_ERROR));
    } finally {
      dispatch(stopLoading());
    }
  };
}

function create_supplier(supplier) {
  return {
    type: actionTypes.CREATE_SUPPLIER,
    payload: supplier,
  };
}

export function request_update_supplier(supplier, id) {
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
      dispatch(show_error(SERVER_ERROR));
    } finally {
      dispatch(stopLoading());
    }
  };
}

function update_supplier(supplier) {
  return {
    type: actionTypes.UPDATE_SUPPLIER,
    payload: supplier,
  };
}

export function request_delete_supplier(id) {
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
        console.error(SERVER_ERROR);
      }
    } catch (error) {
      console.error(SERVER_ERROR);
    } finally {
      dispatch(stopLoading());
    }
  };
}

function delete_supplier(id) {
  return {
    type: actionTypes.DELETE_SUPPLIER,
    payload: {
      id,
    },
  };
}

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

function show_error(msg) {
  return {
    type: actionTypes.SHOW_SUPPLIER_ERROR,
    payload: new Error(msg),
  };
}

export function hide_error() {
  return {
    type: actionTypes.HIDE_SUPPLIER_ERROR,
  };
}
