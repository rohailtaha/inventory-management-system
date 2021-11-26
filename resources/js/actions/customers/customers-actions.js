import axios from 'axios';
import { SERVER_ERROR } from '../../utils/util_structures';
import actionTypes from '../action-types';
import { hide_delete_confirmation } from '../delete-confirmation/delete-confirmation-actions';
import { load, stopLoading } from '../load/load';
import { request_fetch_some_sales } from '../sales/sales-actions';
import { show_success_message } from '../success-message/success-message-actions';

const SUCCESSFULL_CREATE_MSG = 'Customer added.';
const SUCCESSFULL_UPDATE_MSG = 'Customer updated.';
const SUCCESSFULL_DELETE_MSG = 'Customer deleted.';

export const request_fetch_customers = () => async dispatch => {
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

const set_customers = customers => ({
  type: actionTypes.SET_CUSTOMERS,
  payload: customers,
});

export const request_create_customer = customer => async dispatch => {
  try {
    dispatch(load());
    const response = await axios.post('/api/customers', customer);
    if (response.data.status === 'OK') {
      dispatch(create_customer(response.data.customer));
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

const create_customer = customer => ({
  type: actionTypes.CREATE_CUSTOMER,
  payload: customer,
});

export const request_update_customer = (customer, id) => async dispatch => {
  try {
    dispatch(load());
    const response = await axios.put(`/api/customers/${id}`, customer);
    if (response.data.status === 'OK') {
      dispatch(update_customer(response.data.customer));
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

const update_customer = customer => ({
  type: actionTypes.UPDATE_CUSTOMER,
  payload: customer,
});

export const request_delete_customer = id => async dispatch => {
  dispatch(hide_delete_confirmation());
  dispatch(load());
  try {
    const response = await axios.delete(`/api/customers/${id}`);
    if (response.data.status === 'OK') {
      dispatch(show_success_message(SUCCESSFULL_DELETE_MSG));
      dispatch(delete_customer(response.data.id));
      dispatch(request_fetch_some_sales(response.data.sales));
    } else {
      console.error(SERVER_ERROR);
    }
  } catch (error) {
    console.error(SERVER_ERROR);
  } finally {
    dispatch(stopLoading());
  }
};

const delete_customer = id => ({
  type: actionTypes.DELETE_CUSTOMER,
  payload: {
    id,
  },
});

export const sort_customers = (key, order) => ({
  type: actionTypes.SORT_CUSTOMERS,
  payload: {
    key,
    order,
  },
});

export const resort_customers = () => ({
  type: actionTypes.RESORT_CUSTOMERS,
});

export const show_error = msg => ({
  type: actionTypes.SHOW_CUSTOMER_ERROR,
  payload: new Error(msg),
});

export const hide_error = () => ({
  type: actionTypes.HIDE_CUSTOMER_ERROR,
});
