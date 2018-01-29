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

export const queryBook = title => (dispatch, getState) => {
  if (getIsFetching(getState())) return;

  dispatch({ type: types.fetchRequest });
  return axios({
    method: 'get',
    url: `/api/getbook?bookName=${title}`,
  })
    .then((res) => {
      if (res) {
        dispatch({ type: types.fetchSuccess });
        return { response: res.data };
      }
      dispatch({ type: types.fetchFailure });
      sendNotification('an error occured...')(dispatch);
      return null;
    })
    .catch((err) => {
      dispatch((type: types.fetchFailure));
      dispatch({ type: types.sendNotification, message: 'an error occured...' });
      return null;
    });
};

export const sendNotification = message => dispatch =>
  dispatch({ type: types.sendNotification, message });

export const closeNotification = () => dispatch => dispatch({ type: types.closeNotification });

export const selectBook = params => dispatch => dispatch({ type: types.selectBook, book: params });

export const addBook = book => (dispatch, getState) => {
  if (getIsFetching(getState())) return;

  dispatch({ type: types.fetchRequest });
  const content = `book=${JSON.stringify(book)}`;
  return axios
    .post('/api/addbook', content)
    .then((resp) => {
      dispatch({ type: types.fetchSuccess });
      return dispatch(getUserBooks());
      // return resp.data;
    })
    .catch((err) => {
      dispatch({ type: types.fetchFailure });
      sendNotification(err)(dispatch);
      return { error: err };
    });
};

export const setUserBooks = books => dispatch => dispatch({ type: types.setUserBooks, books });

export const getUserBooks = () => (dispatch, getState) => {
  if (getIsFetching(getState())) return;

  dispatch({ type: types.fetchRequest });

  return axios({
    method: 'get',
    url: '/api/userbooks',
  }).then((resp) => {
    dispatch({ type: types.fetchSuccess });
    const books = resp.data.books;
    return dispatch(setUserBooks(books));
  });
};

export const getBookPool = () => (dispatch, getState) => {
  return axios({
    method: 'get',
    url: '/api/bookpool',
  })
    .then((resp) => {
      if (resp && resp.data) {
        return resp.data;
      }
      sendNotification('error getting bookpool')(dispatch);
      return null;
    })
    .catch((err) => {
      sendNotification(err)(dispatch);
      return null;
    });
};
