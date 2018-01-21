import { combineReducers } from 'redux';
import util, * as allUtil from './util';

const store = combineReducers({ util });

export default store;

export const getIsFetching = state => allUtil.getIsFetching(state.util);
