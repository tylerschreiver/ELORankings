import { user_signed_in, user_signed_out, sign_in_fail, set_headers } from '../actions/types';

const INITIAL_STATE = {
  signedIn: false,
  error: '',
  userTag: 'Yee',
  headers: {},
  uid: null
};


const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case user_signed_in:
      return { ...state, signedIn: true, error: '', headers: action.payload.headers, uid: action.payload.uid };
    case user_signed_out: 
      return { ...state, signedIn: false, error: '' };
    case sign_in_fail:
      return { ...state, signedIn: false, error: 'Invalid Email/Password' }
    case set_headers: 
      return { ...state, headers: action.payload };
    default: return state;
  }
};

export default AuthReducer;