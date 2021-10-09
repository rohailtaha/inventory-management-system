import actionTypes from "../../actions/action-types";

const loggedin = false;

function authenticationReducer(state = loggedin, action) {
  switch(action.type) {
    case actionTypes.LOGIN:
      return true;
    case actionTypes.LOGOUT:
      return false;
    default:
      return state;  
  }
}

export default authenticationReducer;