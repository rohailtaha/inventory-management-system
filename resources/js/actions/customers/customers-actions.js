import axios from 'axios';
import { SERVER_ERROR } from '../../utils/util_structures';
import actionTypes from '../action-types';
import { load, stopLoading } from '../load/load';
import { show_success_message } from '../success-message.js/success-message-actions';

export function request_fetch_customers() {
  return async dispatch => {
    try {
      const response = await axios.get('/api/customers');
      if (response.data.status === 'OK') {
        dispatch(set_customers(response.data.customers));
      } else {
        dispatch(show_error(response.data.error.msg));
      }
    } catch (error) {
      dispatch(show_error(SERVER_ERROR));
    }
  };
}

function set_customers(customers) {
  return {
    type: actionTypes.SET_CUSTOMERS,
    payload: customers,
  };
}

export function request_create_customer(customer) {
  return async dispatch => {
    try {
      dispatch(load());
      const response = await axios.post('/api/customers', customer);
      if (response.data.status === 'OK') {
        dispatch(create_customer(response.data.customer));
        dispatch(hide_error());
        dispatch(show_success_message('Customer saved successfully.'));
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

function create_customer(customer) {
  return {
    type: actionTypes.CREATE_CUSTOMER,
    payload: customer,
  };
}

export function request_update_customer(customer, id) {
  return async dispatch => {
    try {
      dispatch(load());
      const response = await axios.put(`/api/customers/${id}`, customer);
      if (response.data.status === 'OK') {
        dispatch(update_customer(response.data.customer));
        dispatch(hide_error());
        dispatch(show_success_message('Customer updated.'));
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

function update_customer(customer) {
  return {
    type: actionTypes.UPDATE_CUSTOMER,
    payload: customer,
  };
}

export function request_delete_customer(id) {
  return dispatch => {
    axios
      .delete(`/api/customers/${id}`)
      .then(response => delete_customer(response.data.id))
      .catch(error => dispatch(show_error(error.response.data.error.msg)));
  };
}

function delete_customer(id) {
  return {
    type: actionTypes.DELETE_CUSTOMER,
    payload: {
      id,
    },
  };
}

function show_error(msg) {
  return {
    type: actionTypes.SHOW_CUSTOMER_ERROR,
    payload: new Error(msg),
  };
}

export function hide_error() {
  return {
    type: actionTypes.HIDE_CUSTOMER_ERROR,
  };
}
