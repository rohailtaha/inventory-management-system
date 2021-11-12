import { SERVER_ERROR } from '../../utils/util_structures';
import actionTypes from '../action-types';
import { hide_delete_confirmation } from '../delete-confirmation/delete-confirmation-actions';
import { load, stopLoading } from '../load/load';
import { show_success_message } from '../success-message/success-message-actions';

const SUCCESSFULL_CREATE_MSG = 'Sale added.';
const SUCCESSFULL_UPDATE_MSG = 'Sale updated.';
const SUCCESSFULL_DELETE_MSG = 'Sale Deleted';

export function request_fetch_sales() {
  return async dispatch => {
    try {
      const response = await axios.get('/api/sales');
      if (response.data.status === 'OK') {
        dispatch(set_sales(response.data.sales));
      } else {
        dispatch(show_error(response.data.error.msg));
      }
    } catch (error) {
      dispatch(show_error(SERVER_ERROR));
    }
  };
}

function set_sales(sales) {
  return {
    type: actionTypes.SET_SALES,
    payload: sales,
  };
}

export function request_create_sale(sale) {
  return async dispatch => {
    try {
      dispatch(load());
      const response = await axios.post('/api/sales', sale);
      if (response.data.status === 'OK') {
        dispatch(create_sale(response.data.sale));
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

function create_sale(sale) {
  return {
    type: actionTypes.CREATE_SALE,
    payload: sale,
  };
}

export function request_update_sale(sale, id) {
  return async dispatch => {
    try {
      dispatch(load());
      const response = await axios.put(`/api/sales/${id}`, sale);
      if (response.data.status === 'OK') {
        dispatch(update_sale(response.data.sale));
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

export function request_delete_sale(id) {
  return async dispatch => {
    dispatch(hide_delete_confirmation());
    dispatch(load());
    try {
      const response = await axios.delete(`/api/sales/${id}`);
      if (response.data.status === 'OK') {
        dispatch(show_success_message(SUCCESSFULL_DELETE_MSG));
        dispatch(delete_sale(response.data.id));
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

function delete_sale(id) {
  return {
    type: actionTypes.DELETE_SALE,
    payload: {
      id,
    },
  };
}

function update_sale(sale) {
  return {
    type: actionTypes.UPDATE_SALE,
    payload: sale,
  };
}

export function set_products_to_sale(products) {
  return {
    type: actionTypes.SET_PRODUCTS_TO_SALE,
    payload: products,
  };
}

export function add_product_to_sale(product) {
  return {
    type: actionTypes.ADD_PRODUCT_TO_SALE,
    payload: product,
  };
}

export function delete_product_from_sale(id) {
  return {
    type: actionTypes.DELETE_PRODUCT_FROM_SALE,
    payload: {
      id,
    },
  };
}

export function clear_products_from_sale() {
  return {
    type: actionTypes.CLEAR_PRODUCTS_FROM_SALE,
  };
}

export function show_products_to_sale_form_error(msg) {
  return {
    type: actionTypes.SHOW_PRODUCTS_TO_SALE_FORM_ERROR,
    payload: new Error(msg),
  };
}

export function hide_products_to_sale_form_error(msg) {
  return {
    type: actionTypes.HIDE_PRODUCTS_TO_SALE_FORM_ERROR,
  };
}

export function set_sales_report(report) {
  return {
    type: actionTypes.SET_SALES_REPORT,
    payload: report,
  };
}

export function show_error(msg) {
  return {
    type: actionTypes.SHOW_SALE_ERROR,
    payload: new Error(msg),
  };
}

export function hide_error() {
  return {
    type: actionTypes.HIDE_SALE_ERROR,
  };
}
