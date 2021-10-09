import actionTypes from '../../actions/action-types';

const initialState = true;

function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_SIDEBAR:
      return action.payload;
    default:
      return state;
  }
}

export default sidebarReducer;
