import { SERVER_ERROR } from '../../utils/util_structures';
import actionTypes from '../action-types';
import { load, stopLoading } from '../load/load';
import { set_user, show_error } from '../users/users-actions';

export function request_login(user) {
  return async dispatch => {
    let response;
    try {
      dispatch(load());
      response = await axios.post('/login', user);
      if (response.data.status === 'OK') {
        dispatch(login());
        dispatch(set_user(response.data.user));
      } else {
        dispatch(show_error(response.data.error.msg));
      }
    } catch (error) {
      error.response.data.error
        ? dispatch(show_error(error.response.data.error.msg))
        : dispatch(show_error(SERVER_ERROR));
    } finally {
      return dispatch(stopLoading());
    }
  };
}

export function attempt_login() {
  return async dispatch => {
    dispatch(load());
    try {
      const response = await axios.get('/login_status');
      dispatch(stopLoading());
      if (response.data.loggedin) {
        dispatch(login());
        dispatch(set_user(response.data.user));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function logout() {
  return {
    type: actionTypes.LOGOUT,
  };
}

export function login() {
  return {
    type: actionTypes.LOGIN,
  };
}
