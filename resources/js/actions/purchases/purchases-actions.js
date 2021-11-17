import { SERVER_ERROR } from '../../utils/util_structures';
import actionTypes from '../action-types';
import { hide_delete_confirmation } from '../delete-confirmation/delete-confirmation-actions';
import { load, stopLoading } from '../load/load';
import { request_fetch_some_products } from '../products/products-actions';
import { show_success_message } from '../success-message/success-message-actions';

const SUCCESSFULL_CREATE_MSG = 'Purchase added.';
const SUCCESSFULL_UPDATE_MSG = 'Purchase updated.';
const SUCCESSFULL_DELETE_MSG = 'Purchase Deleted.';

export function request_fetch_purchases() {
  return async dispatch => {
    try {
      const response = await axios.get('/api/purchases');
      if (response.data.status === 'OK') {
        dispatch(set_purchases(response.data.purchases));
      } else {
        dispatch(show_error(response.data.error.msg));
      }
    } catch (error) {
      dispatch(show_error(SERVER_ERROR));
    }
  };
}

function set_purchases(purchases) {
  return {
    type: actionTypes.SET_PURCHASES,
    payload: purchases,
  };
}

export function request_create_purchase(purchase) {
  return async dispatch => {
    try {
      dispatch(load());
      const response = await axios.post('/api/purchases', purchase);
      if (response.data.status === 'OK') {
        dispatch(create_purchase(response.data.purchase));
        dispatch(
          request_fetch_some_products(
            response.data.purchase.products.map(product => product.id)
          )
        );
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

function create_purchase(purchase) {
  return {
    type: actionTypes.CREATE_PURCHASE,
    payload: purchase,
  };
}

export function request_update_purchase(purchase, id) {
  return async dispatch => {
    try {
      dispatch(load());
      const response = await axios.put(`/api/purchases/${id}`, purchase);
      if (response.data.status === 'OK') {
        dispatch(update_purchase(response.data.purchase));
        dispatch(
          request_fetch_some_products(
            response.data.purchase.products.map(product => product.id)
          )
        );
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

export function request_delete_purchase(id) {
  return async dispatch => {
    dispatch(hide_delete_confirmation());
    dispatch(load());
    try {
      const response = await axios.delete(`/api/purchases/${id}`);
      if (response.data.status === 'OK') {
        dispatch(request_fetch_some_products(response.data.products));
        dispatch(delete_purchase(response.data.id));
        dispatch(show_success_message(SUCCESSFULL_DELETE_MSG));
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

function delete_purchase(id) {
  return {
    type: actionTypes.DELETE_PURCHASE,
    payload: {
      id,
    },
  };
}

function update_purchase(purchase) {
  return {
    type: actionTypes.UPDATE_PURCHASE,
    payload: purchase,
  };
}

export function set_products_to_purchase(products) {
  return {
    type: actionTypes.SET_PRODUCTS_TO_PURCHASE,
    payload: products,
  };
}

export function add_product_to_purchase(product) {
  return {
    type: actionTypes.ADD_PRODUCT_TO_PURCHASE,
    payload: product,
  };
}

export function delete_product_from_purchase(id) {
  return {
    type: actionTypes.DELETE_PRODUCT_FROM_PURCHASE,
    payload: {
      id,
    },
  };
}

export function clear_products_from_purchase() {
  return {
    type: actionTypes.CLEAR_PRODUCTS_FROM_PURCHASE,
  };
}

export function show_products_to_purchase_form_error(msg) {
  return {
    type: actionTypes.SHOW_PRODUCTS_TO_PURCHASE_FORM_ERROR,
    payload: new Error(msg),
  };
}

export function hide_products_to_purchase_form_error(msg) {
  return {
    type: actionTypes.HIDE_PRODUCTS_TO_PURCHASE_FORM_ERROR,
  };
}

export function set_purchases_report(report) {
  return {
    type: actionTypes.SET_PURCHASES_REPORT,
    payload: report,
  };
}

export function show_error(msg) {
  return {
    type: actionTypes.SHOW_PURCHASE_ERROR,
    payload: new Error(msg),
  };
}

export function hide_error() {
  return {
    type: actionTypes.HIDE_PURCHASE_ERROR,
  };
}
