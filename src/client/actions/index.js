import types from '../constants';
import { getIsFetching } from '../reducers';

export const addUser = user => (dispatch, getState) => {
  if (getIsFetching(getState())) return;

  dispatch({ type: types.fetchRequest });

  setTimeout(() => {
    dispatch({ type: types.fetchSuccess });
  }, 5000);
};
