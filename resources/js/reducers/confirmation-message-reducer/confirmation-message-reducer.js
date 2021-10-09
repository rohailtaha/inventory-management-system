import actionTypes from '../../actions/action-types';

const initialState = {
  show: false,
  msg: 'Are you sure you want to delete?',
};

function confirmationMessageReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SHOW_CONFIRMATION:
      return {
        show: true,
        msg: action.payload || initialState.msg,
      };
    case actionTypes.HIDE_CONFIRMATION:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
}

export default confirmationMessageReducer;
