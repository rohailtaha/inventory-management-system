import actionTypes from '../action-types';

function show_confirmation(msg = '') {
  return {
    type: actionTypes.SHOW_CONFIRMATION,
    payload: msg,
  };
}

function hide_confirmation() {
  return {
    type: actionTypes.HIDE_CONFIRMATION,
  };
}

export { show_confirmation, hide_confirmation };
