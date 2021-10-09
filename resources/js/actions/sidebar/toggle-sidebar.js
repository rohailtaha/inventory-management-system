import actionTypes from '../action-types';

function toggleSidebar(currentState) {
  return {
    type: actionTypes.TOGGLE_SIDEBAR,
    payload: !currentState,
  };
}

export default toggleSidebar;
