import { generateEvents } from '../mockData/mock';
import { events_requested, event_selected, create_event, event_sign_in, event_sign_out } from './types';
import faker from 'faker';

const tempEvent = {
  activeTimeSlots: [{
    end: new Date(2019, 4, 20, 23),
    start: new Date(2019, 4, 20, 16, 20) 
  }],
  description: "Best Louisville Monthly",
  id: "a3c5862e-bd60-41ff-9185-f2997019c0f6",
  name: "House of Cards",
  address: '1511 Bellamy Pl',
  region: {
    id: "23dafbe3-5802-4a47-9951-8b7487d77ca1",
    region: "Kentucky"
  },
  tourneyLink: "smash.gg"
};

export const getEvents = () => {
  return async (dispatch, getState) => {
    let events = getState().EventsReducer.events;
    if (events === null) events = [tempEvent];
    dispatch({ type: events_requested, payload: events });
  }
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

export const createEvent = event => {
  event.id = faker.random.uuid();
  return { type: create_event, payload: event };
}