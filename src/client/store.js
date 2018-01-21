import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';
import { devToolsEnhancer, composeWithDevTools } from 'redux-devtools-extension';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const thunk = store => next => action =>
  (typeof action === 'function' ? action(store.dispatch, store.getState) : next(action));

const middlewares = [thunk];

export default () =>
  createStore(reducers, preloadedState, composeWithDevTools(applyMiddleware(...middlewares)));
