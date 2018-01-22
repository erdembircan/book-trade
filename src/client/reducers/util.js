import { combineReducers } from 'redux';
import types from '../constants';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.fetchRequest:
      return true;
    case types.fetchSuccess:
    case types.fetchFailure:
      return false;
    default:
      return false;
  }
};

const errors = (state = {}, action) => {
  if (action.type === types.setError) {
    return { ...state, ...action.errors };
  }
  return state;
};

export default combineReducers({ isFetching, errors });

export const getIsFetching = state => state.isFetching;
