import { user_signed_in, user_signed_out, sign_in_fail, set_headers } from './types';
import firebase from 'react-native-firebase';
import backendUrl from '../globals/environment';

export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      const token = await user.user.getIdToken();
      const headers = {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      };
      dispatch({ type: user_signed_in, payload: { headers, uid: user.user.uid } });
    } catch(e) {
      console.log(e);
    }
  }
};

export const signOut = () => {
  return { type: user_signed_out };
};

export const createAccount = (email, password, region, character, tag) => {
  return async (dispatch) => {
    try {
      const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const token = await user.user.getIdToken();
      const body = JSON.stringify({
        regionId: region,
        primaryCharacter: character,
        displayName: tag
      });

      const headers = {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      };
  
      const url = backendUrl + '/Users';
      
      const response = await fetch(url, { 
        method: "POST",
        headers, 
        body 
      });
  
      if (response.ok) {
        dispatch({ type: set_headers, payload: headers });
      }
    
      return response.ok;
    } catch(e) {
      console.log(e);
    }
  }
};