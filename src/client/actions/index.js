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

export const getBookPool = () => (dispatch, getState) =>
  axios({
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

export const makeRequest = (bookId, bookTitle) => (dispatch) => {
  const content = `bookid=${bookId}&booktitle=${bookTitle}`;

  return axios.post('/api/makerequest', content).then(({ data }) => {
    if (data.response) {
      sendNotification('book requested')(dispatch);
      getTrades('out')(dispatch);
      getTrades('in')(dispatch);
    } else {
      sendNotification('an error occured')(dispatch);
    }
  });
};

export const uncheckedCount = count => dispatch =>
  dispatch({ type: types.setUncheckedCount, count });

export const getTrades = type => (dispatch) => {
  const url = `/api/trades?type=${type}`;

  return axios({ method: 'get', url })
    .then((resp) => {
      if (resp.data && resp.data.response) {
        uncheckedCount(resp.data.unchecked)(dispatch);
        if (type === 'in') return dispatch({ type: types.setTradesIn, trades: resp.data.response });
        if (type === 'out') {
          return dispatch({ type: types.setTradesOut, trades: resp.data.response });
        }
        sendNotification('invalid request')(dispatch);
        return null;
      }
      sendNotification('an error occured')(dispatch);
      return null;
    })
    .catch((err) => {
      sendNotification('an error occured')(dispatch);
      return null;
    });
};
