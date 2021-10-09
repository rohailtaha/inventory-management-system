import actionTypes from '../../actions/action-types';

const initialState = false;

function loadReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD:
      return true;
    case actionTypes.STOP_LOADING:
      return false;
    default:
      return state;
  }
}

export default loadReducer;
