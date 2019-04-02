import { generateEvents } from '../mockData/mock';
import { events_requested, event_selected } from './types';

export const getEvents = () => {
  // return async (dispatch, getState) => {
  //   try {

      let events = generateEvents();
      return { type: events_requested, payload: events };
  //   } catch(e) {
  //     console.log(e);
  //   }
  // }
};

export const setSelectedEvent = (event) => {
  return { type: event_selected, payload: event }
}