import axios from 'axios';
import types from '../constants';
import { getIsFetching } from '../reducers';

export const addUser = user => (dispatch, getState) => {
  if (getIsFetching(getState())) return;

  dispatch({ type: types.fetchRequest });

  const content = `name=${user.name}&password=${user.password}`;
  return axios
    .post('/api/addUser', content)
    .then((res) => {
      if (res.data.response) {
        dispatch({ type: types.fetchSuccess });
        return { response: res.data.response };
      }
      dispatch({ type: types.fetchFailure });
      dispatch({ type: types.setError, errors: res.data.errors });
      return null;
    })
    .catch((err) => {
      dispatch({ type: types.fetchFailure });
      dispatch({ type: types.setError, errors: { global: err } });
      return null;
    });
};

export const setError = error => (dispatch, getState) => {
  if (!error) {
    const stateErrors = getState().util.errors;
    Object.keys(stateErrors).map((key) => {
      stateErrors[key] = '';
    });
    return dispatch({ type: types.setError, errors: stateErrors });
  }
  return dispatch({ type: types.setError, errors: error });
};

export const logUser = user => (dispatch, getState) => {
  if (getIsFetching(getState())) return;

  dispatch({ type: types.fetchRequest });

  const content = `name=${user.name}&password=${user.password}`;

  return axios
    .post('/api/logUser', content)
    .then((res) => {
      if (res.data.response) {
        dispatch({ type: types.fetchSuccess });
        return { response: res.data.response };
      }
      dispatch({ type: types.fetchFailure });
      dispatch({ type: types.setError, errors: res.data.errors });
      return null;
    })
    .catch((err) => {
      dispatch({ type: types.fetchFailure });
      dispatch({ type: types.setError, errors: { global: err } });
      return null;
    });
};

export const sendNotification = message => dispatch =>
  dispatch({ type: types.sendNotification, message });

export const closeNotification = () => dispatch => dispatch({ type: types.closeNotification });
