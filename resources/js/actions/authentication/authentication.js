import actionTypes from '../action-types';

function login() {
  return {
    type: actionTypes.LOGIN,
  };
}

function logout() {
  return {
    type: actionTypes.LOGOUT,
  };
}

export {login, logout};


