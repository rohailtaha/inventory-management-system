import actionTypes from '../../actions/action-types';

const initialState = {
  show: false,
  msg: '',
};

function errorsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SHOW_ERROR:
      return {
        show: true,
        msg: action.payload,
      };
    case actionTypes.HIDE_ERROR:
      return initialState;
    default:
      return state;
  }
}

export default errorsReducer;
