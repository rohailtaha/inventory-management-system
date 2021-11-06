import axios from 'axios';
import { SERVER_ERROR } from '../../utils/util_structures';
import actionTypes from '../action-types';
import { load, stopLoading } from '../load/load';
import { show_success_message } from '../success-message/success-message-actions';

export function fetch_categories() {
  return async dispatch => {
    try {
      const response = await axios.get('/api/categories');
      if (response.data.status === 'OK') {
        dispatch(set_categories(response.data.categories));
      } else {
        dispatch(show_error(response.data.error.msg));
      }
    } catch (error) {
      dispatch(show_error(SERVER_ERROR));
    }
  };
}

function set_categories(categories) {
  return {
    type: actionTypes.SET_CATEGORIES,
    payload: categories,
  };
}

export function request_create_category(category) {
  return async dispatch => {
    try {
      dispatch(load());
      const response = await axios.post('/api/categories', category);
      if (response.data.status === 'OK') {
        dispatch(create_category(response.data.category));
        dispatch(hide_error());
        dispatch(show_success_message('Category saved successfully.'));
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

function create_category(category) {
  return {
    type: actionTypes.CREATE_CATEGORY,
    payload: category,
  };
}

export function request_update_category(category, id) {
  return async dispatch => {
    try {
      dispatch(load());
      const response = await axios.put(`/api/categories/${id}`, category);
      if (response.data.status === 'OK') {
        dispatch(update_category(response.data.category));
        dispatch(hide_error());
        dispatch(show_success_message('Category Updated.'));
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

function update_category(category) {
  return {
    type: actionTypes.UPDATE_CATEGORY,
    payload: category,
  };
}

export function request_delete_category(id) {
  return dispatch => {
    axios
      .delete(`/api/categories/${id}`)
      .then(response => delete_category(response.data.id))
      .catch(error => dispatch(show_error(error.response.data.error.msg)));
  };
}

function delete_category(id) {
  return {
    type: actionTypes.DELETE_CATEGORY,
    payload: {
      id,
    },
  };
}

function show_error(msg) {
  return {
    type: actionTypes.SHOW_CATEGORY_ERROR,
    payload: new Error(msg),
  };
}

export function hide_error() {
  return {
    type: actionTypes.HIDE_CATEGORY_ERROR,
  };
}
