import { set_users, set_leaderboard } from '../actions/types';

const INITIAL_STATE = {
  users: [],
  leaderboard: [],
  currentUser: null
};

const UsersReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case set_users:
      return { ...state, users: action.payload };
    case set_leaderboard: 
      return { ...state, leaderboard: action.payload };
    default: return state;
  }
};

export default UsersReducer;