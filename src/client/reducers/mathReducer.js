import types from '../constants';

export default (state = 0, action) => {
  switch (action.type) {
    case types.increment:
      return state + 1;
    case types.decrement:
      return state - 1;
    default:
      return state;
  }
};
