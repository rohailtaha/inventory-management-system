import actionTypes from '../action-types';

function load() {
  return {
    type: actionTypes.LOAD,
  };
}

function stopLoading() {
  return {
    type: actionTypes.STOP_LOADING,
  };
}

export { load, stopLoading };
