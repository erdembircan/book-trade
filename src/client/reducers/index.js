import { combineReducers } from 'redux';
import util, * as allUtil from './util';
import user from './user';

const store = combineReducers({ util, user });

export default store;

export const getIsFetching = state => allUtil.getIsFetching(state.util);
