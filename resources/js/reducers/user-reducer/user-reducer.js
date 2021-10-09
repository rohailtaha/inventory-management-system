import actionTypes from '../../actions/action-types';

const initialState = {
  name: '',
  email: '',
  phone: '',
  role: '',
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.SET_USER_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    case actionTypes.RESET_USER:
      return initialState;
    default:
      return state;
  }
}

export default userReducer;
