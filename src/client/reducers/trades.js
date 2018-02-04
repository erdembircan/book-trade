import { combineReducers } from 'redux';
import types from '../constants';

const inbox = (state = [], action) => {
  if (action.type === types.setTradesIn && action.trades) {
    return action.trades;
  }
  return state;
};

const outbox = (state = [], action) => {
  if (action.type === types.setTradesOut && action.trades) {
    return action.trades;
  }
  return state;
};

export default combineReducers({ inbox, outbox });
