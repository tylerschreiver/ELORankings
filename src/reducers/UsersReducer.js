import { 
  set_users, 
  set_leaderboard, 
  set_viewed_user, 
  remove_viewed_user, 
  set_current_user, 
  remove_current_user, 
  get_admins
} from '../actions/types';

const INITIAL_STATE = {
  users: [],
  leaderboard: [],
  currentUser: null,
  viewedUser: null,
  admins: []
};

const UsersReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case set_users:
      return { ...state, users: action.payload };
    case set_leaderboard: 
      return { ...state, leaderboard: action.payload };
    case set_viewed_user:
      return { ...state, viewedUser: action.payload };
    case remove_viewed_user: 
      return { ...state, viewedUser: null };
    case set_current_user:
      return { ...state, currentUser: action.payload };
    case remove_current_user:
      return { ...state, currentUser: null };
    case get_admins:
      return { ...state, admins: action.payload };
    default: return state;
  }
};

export default UsersReducer;