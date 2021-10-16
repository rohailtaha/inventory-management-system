import actionTypes from '../../actions/action-types';

const initialState = {
  list: [],
  fetched: false,
  error: {
    show: false,
    msg: '',
  },
};

function purchasesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_PURCHASES:
      return {
        ...state,
        fetched: true,
        list: action.payload,
      };
    case actionTypes.CREATE_PURCHASE:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };
    case actionTypes.UPDATE_PURCHASE:
      return {
        ...state,
        list: state.list.map(purchase =>
          purchase.id === action.payload.id ? action.payload : purchase
        ),
      };
    case actionTypes.DELETE_PURCHASE:
      return {
        ...state,
        list: state.list.filter(purchase => purchase.id != action.payload.id),
      };
    case actionTypes.SHOW_PURCHASE_ERROR:
      return {
        ...state,
        error: {
          show: true,
          msg: action.payload.message,
        },
      };
    case actionTypes.HIDE_PURCHASE_ERROR:
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

export default purchasesReducer;
