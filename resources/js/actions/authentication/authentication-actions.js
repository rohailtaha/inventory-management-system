import { SERVER_ERROR } from '../../utils/util_structures';
import actionTypes from '../action-types';
import { load, stopLoading } from '../load/load';
import { reset_user, set_user, show_error } from '../users/users-actions';

export const request_login = user => {
  return async dispatch => {
    try {
      dispatch(load());
      const response = await axios.post('/login', user);
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
};

export const request_logout = user => {
  return async dispatch => {
    try {
      dispatch(load());
      const response = await axios.get('/logout', user);
      if (response.data.status === 'OK') {
        dispatch(logout());
        dispatch(reset_user());
      } else {
        alert(SERVER_ERROR);
      }
    } catch (error) {
      alert(SERVER_ERROR);
    } finally {
      return dispatch(stopLoading());
    }
  };
};

export const attempt_login = () => {
  return async dispatch => {
    dispatch(load());
    try {
      const response = await axios.get('/login/status');
      if (response.data.status === 'OK') {
        dispatch(login());
        dispatch(set_user(response.data.user));
      }
    } catch (error) {
      if (!error.response.data.error) alert(SERVER_ERROR);
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const request_forgot_password = email => {
  return async dispatch => {
    dispatch(load());
    try {
      const response = await axios.post('/forgot-password', {
        email,
      });
      if (response.data.status === 'OK') {

      }
    } catch (error) {
      if (!error.response.data.error) alert(SERVER_ERROR);
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

export const login = () => ({
  type: actionTypes.LOGIN,
});
