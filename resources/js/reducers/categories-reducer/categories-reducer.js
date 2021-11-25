import actionTypes from '../../actions/action-types';
import { sort } from '../../utils/utility_functions';
import { orders } from '../../utils/util_structures';

const initialState = {
  list: [],
  fetched: false,
  error: {
    show: false,
    msg: '',
  },
};

function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CATEGORIES:
      return {
        ...state,
        fetched: true,
        list: action.payload,
      };
    case actionTypes.CREATE_CATEGORY:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };
    case actionTypes.UPDATE_CATEGORY:
      return {
        ...state,
        list: state.list.map(category =>
          category.id === action.payload.id ? action.payload : category
        ),
      };
    case actionTypes.DELETE_CATEGORY:
      return {
        ...state,
        list: state.list.filter(category => category.id != action.payload.id),
      };
    case actionTypes.SHOW_CATEGORY_ERROR:
      return {
        ...state,
        error: {
          show: true,
          msg: action.payload.msg,
        },
      };
    case actionTypes.HIDE_CATEGORY_ERROR:
      return {
        ...state,
        error: {
          show: false,
          msg: '',
        },
      };

    case actionTypes.SORT_CATEGRIES:
      return {
        ...state,
        list: sort(state.list, action.payload.key, action.payload.order),
      };

    case actionTypes.RESORT_CATEGRIES:
      return {
        ...state,
        list: sort(state.list, 'created_at', orders.DESC),
      };

    default:
      return state;
  }
}

export default categoriesReducer;
