import { generateEvents } from '../mockData/mock';
import { events_requested, event_selected, create_event, event_sign_in, event_sign_out, set_set_id } from './types';
import faker from 'faker';
import backendUrl from '../globals/environment';
import socket from '../globals/socket';
import { Actions } from 'react-native-router-flux';

export const getEvents = () => {
  return async (dispatch, getState) => {
    try {
      const { headers } = getState().AuthReducer;
      const url = backendUrl + '/Events';
      const response = await fetch(url, { method: 'GET', headers });
      const events = JSON.parse(response._bodyText);
      
      dispatch({ type: events_requested, payload: events });
    } catch (e) {
      console.log(e);
    }
  }
};

export const setSelectedEvent = (event) => {
  return { type: event_selected, payload: event }
}

export const eventSignIn = event => {
  return async (dispatch, getState) => {
    const { headers } = getState().AuthReducer;
    const url = backendUrl + '/Events/' + event.id + '/signin';

    const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify({}) });
    if (response.ok) {
      dispatch({ type: event_sign_in, payload: event });
    }
  }
}

export const eventSignOut = () => { 
  return { type: event_sign_out };
}

export const createEvent = event => {
  event.id = faker.random.uuid();
  return { type: create_event, payload: event };
}

export const createSet = (set) => {
  return async (dispatch, getState) => {
    const { headers } = getState().AuthReducer;
    const token = headers.Authorization.slice(7, headers.Authorization.length);
   
    socket.connect(token);
    socket.emit('createSet', set);
    socket.on('setCreated', id => {
      console.log('dispatch fam');
      console.log(id);
      dispatch({ type: set_set_id, payload: { setId: id, strikeFirst: true }});
    });
    socket.on('setJoined', set => {
      console.log('maubne')
      Actions.Set();
    });
  };
}

export const joinSet = set => {
  return async (dispatch, getState) => {
    console.log('joineth');
    const { headers } = getState().AuthReducer;
    const token = headers.Authorization.slice(7, headers.Authorization.length);
    socket.connect(token);
    console.log(set);
    dispatch({ type: set_set_id, payload: { setId: set.setId, strikeFirst: false } });
    socket.emit('joinSet', set);
    socket.on('setJoined', () => {
      Actions.Set();
    });
  };
}