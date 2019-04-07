import { generateEvents } from '../mockData/mock';
import { events_requested, event_selected, event_viewed } from './types';

export const getEvents = () => {
  let events = generateEvents();
  return { type: events_requested, payload: events };

};

export const setSelectedEvent = (event) => {
  return { type: event_selected, payload: event }
}
