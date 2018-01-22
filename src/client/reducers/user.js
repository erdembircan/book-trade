import types from '../constants';

const user = (state = {}, action) => {
  switch (action.type) {
    case types.getUser: {
      return state;
    }
    default:
      return state;
  }
};

export default user;
