import { combineReducers } from 'redux';
import util, * as allUtil from './util';
import user from './user';
import book from './book';
import trades from './trades';

const store = combineReducers({
  util, user, book, trades,
});

export default store;

export const getIsFetching = state => allUtil.getIsFetching(state.util);
