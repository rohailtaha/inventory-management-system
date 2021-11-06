import actionTypes from '../../actions/action-types';

const initialState = {
  show: false,
  confirm: false,
  deleteID: '',
};

export default function deleteConfirmationReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case actionTypes.SHOW_DELETE_CONFIRMATION:
      return {
        ...state,
        show: true,
        deleteID: action.payload.deleteID,
      };
    case actionTypes.HIDE_DELETE_CONFIRMATION:
      return {
        ...initialState,
      };
    case actionTypes.CONFIRM_DELETE:
      return {
        ...state,
        confirm: true,
      };
    default:
      return state;
  }
}
