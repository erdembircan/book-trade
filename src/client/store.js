import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

let preloadedState = window.__PRELOADED_STATE__;
const serverMessage = window.__SERVER_MESSAGE__;

delete window.__PRELOADED_STATE__;
delete window.__SERVER_MESSAGE__;

preloadedState = {
  ...preloadedState,
  ...{ util: { notifications: { message: serverMessage.message } } },
};

const thunk = store => next => action =>
  (typeof action === 'function' ? action(store.dispatch, store.getState) : next(action));

const middlewares = [thunk];

export default () => {
  if (process.env.NODE_ENV === 'production') {
    return createStore(reducers, preloadedState, applyMiddleware(...middlewares));
  }
  return createStore(
    reducers,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
};
