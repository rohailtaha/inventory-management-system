import axios from 'axios';
import { SERVER_ERROR } from '../../utils/util_structures';
import actionTypes from '../action-types';
import { hide_delete_confirmation } from '../delete-confirmation/delete-confirmation-actions';
import { load, stopLoading } from '../load/load';
import { show_success_message } from '../success-message/success-message-actions';

const SUCCESSFULL_CREATE_MSG = 'User added.';
const SUCCESSFULL_UPDATE_MSG = 'User updated.';
const SUCCESSFULL_DELETE_MSG = 'User deleted';
const SUCCESSFULL_PASSWORD_UPDATE_MSG = 'Password updated.';

export const fetch_users = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/users');
      if (response.data.status === 'OK') {
        dispatch(setUsers(response.data.users));
      } else {
        alert(response.data.error.msg);
      }
    } catch (error) {
      alert(SERVER_ERROR);
    }
  };
};

export const request_create_user = user => {
  return async dispatch => {
    dispatch(load());
    try {
      const response = await axios.post('/api/users', user);
      if (response.data.status === 'OK') {
        dispatch(hide_error());
        dispatch(show_success_message(SUCCESSFULL_CREATE_MSG));
        dispatch(create_user(response.data.user));
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

export const request_update_user = (user, id) => {
  return async dispatch => {
    dispatch(load());
    try {
      const response = await axios.put(`/api/users/${id}`, user);
      if (response.data.status === 'OK') {
        dispatch(hide_error());
        dispatch(show_success_message(SUCCESSFULL_UPDATE_MSG));
        dispatch(update_user(response.data.user));
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

export const set_user = user => ({
  type: actionTypes.SET_USER,
  payload: user,
});

export const request_update_current_user = user => {
  return async dispatch => {
    dispatch(load());
    try {
      const response = await axios.put(`/api/user`, user);
      if (response.data.status === 'OK') {
        dispatch(hide_error());
        dispatch(show_success_message(SUCCESSFULL_UPDATE_MSG));
        dispatch(update_current_user(response.data.user));
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

export const update_current_user = user => ({
  type: actionTypes.UPDATE_CURRENT_USER,
  payload: user,
});

export const request_update_password = data => {
  return async dispatch => {
    dispatch(load());
    try {
      const response = await axios.put(`/api/user/password`, data);
      if (response.data.status === 'OK') {
        dispatch(hide_password_form_error());
        dispatch(show_success_message(SUCCESSFULL_PASSWORD_UPDATE_MSG));
      } else {
        dispatch(show_password_form_error(response.data.error.msg));
      }
    } catch (error) {
      error.response.data.error
        ? dispatch(show_password_form_error(error.response.data.error.msg))
        : dispatch(show_password_form_error(SERVER_ERROR));
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const reset_user = () => ({
  type: actionTypes.RESET_USER,
});

export const setUsers = users => ({
  type: actionTypes.SET_USERS,
  payload: users,
});

const create_user = user => ({
  type: actionTypes.CREATE_USER,
  payload: user,
});

const update_user = user => ({
  type: actionTypes.UPDATE_USER,
  payload: user,
});

export const request_delete_user = id => {
  return async dispatch => {
    dispatch(hide_delete_confirmation());
    dispatch(load());
    try {
      const response = await axios.delete(`/api/users/${id}`);
      if (response.data.status === 'OK') {
        dispatch(show_success_message(SUCCESSFULL_DELETE_MSG));
        dispatch(delete_user(response.data.id));
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

const delete_user = id => ({
  type: actionTypes.DELETE_USER,
  payload: {
    id,
  },
});

export const sort_users = (key, order) => ({
  type: actionTypes.SORT_USERS,
  payload: {
    key,
    order,
  },
});

export const resort_users = () => ({
  type: actionTypes.RESORT_USERS,
});

export const show_error = msg => ({
  type: actionTypes.SHOW_USERS_ERROR,
  payload: {
    msg,
  },
});

export const hide_error = () => ({
  type: actionTypes.HIDE_USERS_ERROR,
});

export const show_password_form_error = msg => ({
  type: actionTypes.SHOW_PASSWORD_FORM_ERROR,
  payload: {
    msg,
  },
});

export const hide_password_form_error = () => ({
  type: actionTypes.HIDE_PASSWORD_FORM_ERROR,
});
