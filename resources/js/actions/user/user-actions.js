import actionTypes from '../action-types';

function setRole(role) {
  return {
    type: actionTypes.SET_USER_ROLE,
    payload: role,
  };
}

function setUser(user) {
  return {
    type: actionTypes.SET_USER,
    payload: user,
  };
}

function resetUser() {
  return {
    type: actionTypes.RESET_USER,
  };
}

function displayUserAddedModal() {
  return {
    type:actionTypes.DISPLAY_USER_ADDED_MODAL,
  }
}

export { setRole, setUser, resetUser };
