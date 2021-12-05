import actionTypes from '../../actions/action-types';

const initialState = {
  loggedin: false,
  error: {
    show: false,
    msg: '',
  },
};

function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        loggedin: true,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        loggedin: false,
      };

    case actionTypes.SHOW_AUTHENTICATION_ERROR:
      return {
        ...state,
        error: {
          show: true,
          msg: action.payload.msg,
        },
      };

    case actionTypes.HIDE_AUTHENTICATION_ERROR:
      return {
        ...state,
        error: {
          show: false,
          msg: '',
        },
      };

    default:
      return state;
  }
}

export default authenticationReducer;
