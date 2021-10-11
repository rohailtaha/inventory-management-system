import axios from 'axios';
import actionTypes from '../action-types';
import { load, stopLoading } from '../load/load';
import { show_success_message } from '../success-message.js/success-message-actions';

export function fetch_users() {
  return async dispatch => {
    try {
      const response = await axios.get('/api/users');
      if (response.data.status === 'OK') {
        dispatch(setUsers(response.data.users));
        dispatch(setAreUsersFetched(true));
      } else {
        show_error(response.data.error.msg);
      }
    } catch (error) {
      show_error('Server Error');
    }
  };
}

export function request_create_user(user) {
  return async dispatch => {
    dispatch(load());
    try {
      const response = await axios.post('/api/users', user);
      if (response.data.status === 'OK') {
        dispatch(hide_error());
        dispatch(show_success_message('User updated Sussessfully!'));
        dispatch(create_user(response.data.user));
      } else {
        show_error(response.data.status.error);
      }
    } catch (error) {
      show_error('Server Error');
    } finally {
      dispatch(stopLoading());
    }
  };
}

export function request_update_user(user, id) {
  return async dispatch => {
    dispatch(load());
    try {
      const response = await axios.put(`/api/users/${id}`, user);
      console.log('yes')
      if (response.data.status === 'OK') {
        dispatch(hide_error());
        dispatch(show_success_message('User updated successfully!'));
        dispatch(update_user(response.data.user));
      } else {
        show_error(response.data.status.error);
      }
    } catch (error) {
      show_error('Server Error');
    } finally {
      dispatch(stopLoading());
    }
  };
}

export function set_user(user) {
  return {
    type: actionTypes.SET_USER,
    payload: user,
  };
}

export function reset_user() {
  return {
    type: actionTypes.RESET_USER,
  };
}

export function setUsers(users) {
  return {
    type: actionTypes.SET_USERS,
    payload: users,
  };
}

export function create_user(user) {
  return {
    type: actionTypes.CREATE_USER,
    payload: user,
  };
}

export function update_user(user) {
  return {
    type: actionTypes.UPDATE_USER,
    payload: user,
  };
}

export function delete_user(id) {
  return dispatch => {
    axios
      .delete(`/api/users/${id}`)
      .then(() =>
        dispatch({
          type: actionTypes.DELETE_USER,
          payload: id,
        })
      )
      .catch(error => console.log(error));
  };
}

export function show_error(msg) {
  return {
    type: actionTypes.SHOW_USERS_ERROR,
    payload: {
      msg,
    },
  };
}

export function hide_error() {
  return {
    type: actionTypes.HIDE_USERS_ERROR,
  };
}
