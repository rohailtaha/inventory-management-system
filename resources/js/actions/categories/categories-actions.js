import axios from 'axios';
import actionTypes from '../action-types';
import { load, stopLoading } from '../load/load';
import { show_success_message } from '../success-message.js/success-message-actions';

function fetch_categories() {
  return async dispatch => {
    try {
      const response = await axios.get('/api/categories');
      if (response.data.status === 'OK') {
        dispatch({
          type: actionTypes.FETCH_CATEGORIES,
          payload: response.data.categories,
        });
      } else {
        dispatch(show_error(response.data.error.msg));
      }
    } catch (error) {
      dispatch(show_error('There was an error connecting to the server'));
    }
  };
}

function create_category(category) {
  return async dispatch => {
    try {
      dispatch(load());
      const response = await axios.post('/api/categories', category);
      if (response.data.status === 'OK') {
        dispatch({
          type: actionTypes.CREATE_CATEGORY,
          payload: response.data.category,
        });
        dispatch(hide_error());
        dispatch(show_success_message('Category saved successfully.'));
      } else {
        dispatch(show_error(response.data.error.msg));
      }
    } catch (error) {
      dispatch(show_error('There was an error connecting to the server'));
    } finally {
      dispatch(stopLoading());
    }
  };
}

function update_category(category, id) {
  return async dispatch => {
    try {
      dispatch(load());
      const response = await axios.put(`/api/categories/${id}`, category);
      if (response.data.status === 'OK') {
        dispatch({
          type: actionTypes.UPDATE_CATEGORY,
          payload: response.data.category,
        });
        dispatch(hide_error());
        dispatch(show_success_message('Category Updated.'));
      } else {
        dispatch(show_error(response.data.error.msg));
      }
    } catch (error) {
      dispatch(show_error('There was an error connecting to the server'));
    } finally {
      dispatch(stopLoading());
    }
  };
}

function delete_category(id) {
  return dispatch => {
    axios
      .delete(`/api/categories/${id}`)
      .then(res =>
        dispatch({
          type: actionTypes.DELETE_CATEGORY,
          payload: {
            id: res.data.id,
          },
        })
      )
      .catch(error => dispatch(show_error(error.response.data.error.msg)));
  };
}

function show_error(msg) {
  return {
    type: actionTypes.SHOW_CATEGORY_ERROR,
    payload: new Error(msg),
  };
}

function hide_error() {
  return {
    type: actionTypes.HIDE_CATEGORY_ERROR,
  };
}

export { fetch_categories, create_category, update_category, delete_category };
