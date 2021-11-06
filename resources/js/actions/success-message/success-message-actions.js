import actionTypes from "../action-types";

function show_success_message(msg) {
  return {
    type: actionTypes.SHOW_SUCCESS_MESSAGE,
    payload: {
      msg
    }
  }
}

function hide_success_message() {
    return {
      type: actionTypes.HIDE_SUCCESS_MESSAGE,
    };
}

export { show_success_message, hide_success_message };