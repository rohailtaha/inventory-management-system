import actionTypes from '../../actions/action-types';
import { defaultRowsCountPerPage } from '../../utils/util_structures';

const initialState = {
  itemsPerPage: defaultRowsCountPerPage,
  currentPage: 1,
};

export default function paginationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case actionTypes.SET_ITEMS_PER_PAGE:
      return {
        ...state,
        itemsPerPage: action.payload,
      };

    case actionTypes.RESET_PAGINATION:
      return initialState;

    default:
      return state;
  }
}
