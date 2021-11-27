import { SERVER_ERROR } from '../../utils/util_structures';
import actionTypes from '../action-types';
import { hide_delete_confirmation } from '../delete-confirmation/delete-confirmation-actions';
import { load, stopLoading } from '../load/load';
import { request_fetch_some_products } from '../products/products-actions';
import { show_success_message } from '../success-message/success-message-actions';

const SUCCESSFULL_CREATE_MSG = 'Sale added.';
const SUCCESSFULL_UPDATE_MSG = 'Sale updated.';
const SUCCESSFULL_DELETE_MSG = 'Sale Deleted.';

export const request_fetch_sales = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/sales');
      if (response.data.status === 'OK') {
        dispatch(set_sales(response.data.sales));
      } else {
        alert(response.data.error.msg);
      }
    } catch (error) {
      alert(SERVER_ERROR);
    }
  };
};

export const set_sales = sales => ({
  type: actionTypes.SET_SALES,
  payload: sales,
});

export const request_fetch_some_sales = saleIDs => {
  return async dispatch => {
    try {
      const response = await axios.post(`/api/sales/some`, {
        ids: saleIDs,
      });
      if (response.data.status === 'OK') {
        dispatch(set_some_sales(response.data.sales));
      } else {
        console.error(response.data.error.msg);
      }
    } catch (error) {
      console.error(SERVER_ERROR);
    }
  };
};

export const set_some_sales = sales => ({
  type: actionTypes.SET_SOME_SALES,
  payload: sales,
});

export const request_highest_sales = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/sales/highest');
      if (response.data.status === 'OK') {
        dispatch(set_highest_sales(response.data.highestSellingProducts));
      } else {
        console.error(response.data.error.msg);
      }
    } catch (error) {
      console.error(SERVER_ERROR);
    }
  };
};

export const set_highest_sales = highestSellingProducts => ({
  type: actionTypes.SET_HIGHEST_SALES,
  payload: highestSellingProducts,
});

export const request_create_sale = sale => {
  return async dispatch => {
    try {
      dispatch(load());
      const response = await axios.post('/api/sales', sale);
      if (response.data.status === 'OK') {
        dispatch(create_sale(response.data.sale));
        dispatch(
          request_fetch_some_products(
            response.data.sale.products.map(product => product.id)
          )
        );
        dispatch(request_highest_sales());
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

export const create_sale = sale => ({
  type: actionTypes.CREATE_SALE,
  payload: sale,
});

export const request_update_sale = (sale, id) => {
  return async dispatch => {
    try {
      dispatch(load());
      const response = await axios.put(`/api/sales/${id}`, sale);
      if (response.data.status === 'OK') {
        dispatch(update_sale(response.data.sale));
        dispatch(request_fetch_some_products(response.data.products));
        dispatch(request_highest_sales());
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

export const request_delete_sale = id => {
  return async dispatch => {
    dispatch(hide_delete_confirmation());
    dispatch(load());
    try {
      const response = await axios.delete(`/api/sales/${id}`);
      if (response.data.status === 'OK') {
        dispatch(delete_sale(response.data.id));
        dispatch(request_fetch_some_products(response.data.products));
        dispatch(request_highest_sales());
        dispatch(show_success_message(SUCCESSFULL_DELETE_MSG));
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

export const delete_sale = id => ({
  type: actionTypes.DELETE_SALE,
  payload: {
    id,
  },
});

export const update_sale = sale => ({
  type: actionTypes.UPDATE_SALE,
  payload: sale,
});

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

export const sort_sales = (key, order) => ({
  type: actionTypes.SORT_SALES,
  payload: {
    key,
    order,
  },
});

export const resort_sales = () => ({
  type: actionTypes.RESORT_SALES,
});

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
