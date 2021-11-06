import actionTypes from '../action-types';

export function show_delete_confirmation(deleteID) {
  return {
    type: actionTypes.SHOW_DELETE_CONFIRMATION,
    payload: {
      deleteID,
    },
  };
}

export function hide_delete_confirmation() {
  return {
    type: actionTypes.HIDE_DELETE_CONFIRMATION,
  };
}

export function confirm_delete() {
  return {
    type: actionTypes.CONFIRM_DELETE,
  };
}
