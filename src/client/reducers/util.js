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
      return state;
  }
};

const errors = (state = {}, action) => {
  if (action.type === types.setError) {
    return { ...state, ...action.errors };
  }
  return state;
};

const notifications = (state = { message: '', open: false }, action) => {
  if (action.type === types.sendNotification) {
    return { message: action.message, open: action.message !== '' };
  } else if (action.type === types.closeNotification) {
    const temp = { open: false };
    return { ...state, ...temp };
  }
  return { message: state.message, open: state.message !== '' };
};

export default combineReducers({ isFetching, errors, notifications });

export const getIsFetching = state => state.isFetching;
