import actionTypes from '../../actions/action-types';

const initialState = {
  itemsPerPage: 25,
  currentPage: 1,
};

export default function paginationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case actionTypes.RESET_PAGINATION:
      return initialState;

    default:
      return state;
  }
}
