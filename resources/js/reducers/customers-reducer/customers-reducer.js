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

function customersReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CUSTOMERS:
      return {
        ...state,
        fetched: true,
        list: action.payload,
      };
    case actionTypes.CREATE_CUSTOMER:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };
    case actionTypes.UPDATE_CUSTOMER:
      return {
        ...state,
        list: state.list.map(customer =>
          customer.id === action.payload.id ? action.payload : customer
        ),
      };
    case actionTypes.DELETE_CUSTOMER:
      return {
        ...state,
        list: state.list.filter(customer => customer.id != action.payload.id),
      };
    case actionTypes.SHOW_CUSTOMER_ERROR:
      return {
        ...state,
        error: {
          show: true,
          msg: action.payload.message,
        },
      };
    case actionTypes.HIDE_CUSTOMER_ERROR:
      return {
        ...state,
        error: {
          show: false,
          msg: '',
        },
      };

    case actionTypes.SORT_CUSTOMERS:
      return {
        ...state,
        list: sort(state.list, action.payload.key, action.payload.order),
      };

    case actionTypes.RESORT_CUSTOMERS:
      return {
        ...state,
        list: sort(state.list, 'created_at', orders.DESC),
      };

    default:
      return state;
  }
}

export default customersReducer;
