import actionTypes from '../action-types';

function showError(msg) {
  return {
    type: actionTypes.SHOW_ERROR,
    payload: msg,
  };
}

function hideError() {
  return {
    type: actionTypes.HIDE_ERROR,
  };
}

export { showError, hideError };
