import actionTypes from '../../actions/action-types';
import { sort } from '../../utils/utility_functions';
import { orders } from '../../utils/util_structures';

const initialState = {
  list: [],
  fetched: false,
  searchForm: {
    product: '',
    category: '',
  },
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

    case actionTypes.SET_SOME_PRODUCTS:
      return {
        ...state,
        list: state.list.map(product => {
          const updatedProduct = action.payload.products.find(
            updatedProduct => product.id === updatedProduct.id
          );
          if (updatedProduct) return updatedProduct;
          return product;
        }),
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
          msg: action.payload.msg,
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

    case actionTypes.SET_PRODUCTS_SEARCH_FORM:
      return {
        ...state,
        searchForm: {
          ...state.searchForm,
          ...action.payload,
        },
      };

    case actionTypes.RESET_PRODUCTS_SEARCH_FORM:
      return {
        ...state,
        searchForm: {
          product: '',
          category: '',
        },
      };

    case actionTypes.SORT_PRODUCTS:
      return {
        ...state,
        list: sort(state.list, action.payload.key, action.payload.order),
      };

    case actionTypes.RESORT_PRODUCTS:
      return {
        ...state,
        list: sort(state.list, 'created_at', orders.DESC),
      };

    default:
      return state;
  }
}

export default productsReducer;
