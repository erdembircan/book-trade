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

export default combineReducers({ isFetching });

export const getIsFetching = state => state.isFetching;
