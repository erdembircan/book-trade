import { combineReducers } from 'redux';
import types from '../constants';

const selected = (state = {}, action) => {
  if (action.type === types.selectBook) {
    return { ...state, ...action.book };
  }
  return state;
};

export default combineReducers({ selected });
