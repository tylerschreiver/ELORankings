import { user_signed_in, user_signed_out } from './types';

export const signIn = (user, pass) => {
  return { type: user_signed_in, payload: true };
};

export const signOut = () => {
  return { type: user_signed_out };
};