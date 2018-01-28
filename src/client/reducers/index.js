import { combineReducers } from 'redux';
import util, * as allUtil from './util';
import user from './user';
import book from './book';

const store = combineReducers({ util, user, book });

export default store;

export const getIsFetching = state => allUtil.getIsFetching(state.util);
