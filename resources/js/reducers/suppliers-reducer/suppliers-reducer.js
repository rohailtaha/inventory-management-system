import actionTypes from '../../actions/action-types';

const initialState = {
  list: [],
  fetched: false,
  error: {
    show: false,
    msg: '',
  },
};

function suppliersReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SUPPLIERS:
      return {
        ...state,
        fetched: true,
        list: action.payload,
      };
    case actionTypes.CREATE_SUPPLIER:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };
    case actionTypes.UPDATE_SUPPLIER:
      return {
        ...state,
        list: state.list.map(supplier =>
          supplier.id === action.payload.id ? action.payload : supplier
        ),
      };
    case actionTypes.DELETE_SUPPLIER:
      return {
        ...state,
        list: state.list.filter(supplier => supplier.id != action.payload.id),
      };
    case actionTypes.SHOW_SUPPLIER_ERROR:
      return {
        ...state,
        error: {
          show: true,
          msg: action.payload.message,
        },
      };
    case actionTypes.HIDE_SUPPLIER_ERROR:
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

export default suppliersReducer;
