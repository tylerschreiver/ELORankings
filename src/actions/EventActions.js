import { generateEvents } from '../mockData/mock';
import { events_requested, event_selected, event_viewed, event_sign_in, event_sign_out } from './types';

export const getEvents = () => {
  let events = generateEvents();
  return { type: events_requested, payload: events };

};

export const setSelectedEvent = (event) => {
  return { type: event_selected, payload: event }
}

export const eventSignIn = (event) => {
  return { type: event_sign_in, payload: event }
}

export const eventSignOut = () => { 
  return { type: event_sign_out };
}