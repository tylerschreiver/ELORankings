import { user_signed_in, user_signed_out, sign_in_fail } from '../actions/types';

const INITIAL_STATE = {
  signedIn: false,
  error: ''
};


const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case user_signed_in:
      return { ...state, signedIn: true, error: '' };
    case user_signed_out: 
      return { ...state, signedIn: false, error: '' };
    case sign_in_fail:
      return { ...state, signedIn: false, error: 'Invalid Email/Password' }
    default: return state;
  }
};

export default AuthReducer;