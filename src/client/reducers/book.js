import { combineReducers } from 'redux';
import types from '../constants';

const selected = (state = {}, action) => {
  if (action.type === types.selectBook) {
    return { ...state, ...action.book };
  }
  return state;
};

const userbooks = (state = [], action) => {
  if (action.type === types.setUserBooks) {
    return [...action.books];
  }
  return state;
};

export default combineReducers({ selected, userbooks });
