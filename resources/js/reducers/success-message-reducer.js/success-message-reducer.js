import { stubFalse } from 'lodash';
import actionTypes from '../../actions/action-types';

const initialState = {
  show: false,
  text: 'Action Successfull',
};

function successMessageReduer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SHOW_SUCCESS_MESSAGE:
      return {
        show: true,
        text: action.payload.msg,
      };
    case actionTypes.HIDE_SUCCESS_MESSAGE:
      return initialState;
    default:
      return state;
  }
}

export default successMessageReduer;
