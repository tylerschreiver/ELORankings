import { user_signed_in, user_signed_out } from '../actions/types';

const INITIAL_STATE = {
  signedIn: false
};


const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case user_signed_in:
      console.log('reducer');
      return { ...state, signedIn: true };
    case user_signed_out: return { ...state, signedIn: false };
    default: return state;
  }
};

export default AuthReducer;