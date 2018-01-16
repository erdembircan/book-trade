import { combineReducers, createStore } from 'redux';
import value from './reducers/mathReducer';
import { devToolsEnhancer } from 'redux-devtools-extension';

const reducers = combineReducers({ value });

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

export default () => createStore(reducers, preloadedState, devToolsEnhancer());
