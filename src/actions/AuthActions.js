import { user_signed_in, user_signed_out, sign_in_fail } from './types';
import firebase from 'react-native-firebase';

export const signIn = (email, password) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((callback) => {
      dispatch({type: user_signed_in});
    })
    .catch((e) => {
      dispatch({type: sign_in_fail});
    });
  }
};

export const signOut = () => {
  return { type: user_signed_out };
};

export const createAccount = (email, password) => {
  return () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => console.log('create'))
    .catch(() => console.log('fail'));
  }
}