import axios from 'axios';
import { SERVER_ERROR } from '../../utils/util_structures';
import actionTypes from '../action-types';
import { hide_delete_confirmation } from '../delete-confirmation/delete-confirmation-actions';
import { load, stopLoading } from '../load/load';
import { request_fetch_some_products } from '../products/products-actions';
import { show_success_message } from '../success-message/success-message-actions';

const SUCCESSFULL_CREATE_MSG = 'Category added.';
const SUCCESSFULL_UPDATE_MSG = 'Category updated.';
const SUCCESSFULL_DELETE_MSG = 'Category deleted';

export const fetch_categories = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/categories');
      if (response.data.status === 'OK') {
        dispatch(set_categories(response.data.categories));
      } else {
        alert(response.data.error.msg);
      }
    } catch (error) {
      alert(SERVER_ERROR);
    }
  };
};

const set_categories = categories => ({
  type: actionTypes.SET_CATEGORIES,
  payload: categories,
});

export const request_create_category = category => {
  return async dispatch => {
    try {
      dispatch(load());
      const response = await axios.post('/api/categories', category);
      if (response.data.status === 'OK') {
        dispatch(create_category(response.data.category));
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

const create_category = category => ({
  type: actionTypes.CREATE_CATEGORY,
  payload: category,
});

export const request_update_category = (category, id) => {
  return async dispatch => {
    try {
      dispatch(load());
      const response = await axios.put(`/api/categories/${id}`, category);
      if (response.data.status === 'OK') {
        dispatch(update_category(response.data.category));
        dispatch(hide_error());
        dispatch(show_success_message(SUCCESSFULL_UPDATE_MSG));
        dispatch(request_fetch_some_products(response.data.products));
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

const update_category = category => ({
  type: actionTypes.UPDATE_CATEGORY,
  payload: category,
});

export const request_delete_category = id => {
  return async dispatch => {
    dispatch(hide_delete_confirmation());
    dispatch(load());
    try {
      const response = await axios.delete(`/api/categories/${id}`);
      if (response.data.status === 'OK') {
        dispatch(show_success_message(SUCCESSFULL_DELETE_MSG));
        dispatch(delete_category(response.data.id));
        dispatch(request_fetch_some_products(response.data.products));
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

const delete_category = id => ({
  type: actionTypes.DELETE_CATEGORY,
  payload: {
    id,
  },
});

export const sort_categories = (key, order) => ({
  type: actionTypes.SORT_CATEGRIES,
  payload: {
    key,
    order,
  },
});

export const resort_categories = () => ({
  type: actionTypes.RESORT_CATEGRIES,
});

export const show_error = msg => ({
  type: actionTypes.SHOW_CATEGORY_ERROR,
  payload: {
    msg,
  },
});

export const hide_error = () => ({
  type: actionTypes.HIDE_CATEGORY_ERROR,
});
