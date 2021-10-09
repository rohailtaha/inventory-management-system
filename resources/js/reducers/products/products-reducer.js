import actionTypes from '../../actions/action-types';

const initialState = {
  list: [],
  fetched: false,
  error: {
    show: false,
    msg: '',
  },
};

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        fetched: true,
        list: action.payload,
      };
    case actionTypes.CREATE_PRODUCT:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };
    case actionTypes.UPDATE_PRODUCT:
      return {
        ...state,
        list: state.list.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case actionTypes.DELETE_PRODUCT:
      return {
        ...state,
        list: state.list.filter(product => product.id != action.payload.id),
      };
    case actionTypes.SHOW_PRODUCTS_ERROR:
      return {
        ...state,
        error: {
          show: true,
          msg: action.payload.message,
        },
      };
    case actionTypes.HIDE_PRODUCTS_ERROR:
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

export default productsReducer;
