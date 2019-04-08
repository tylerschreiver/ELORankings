import { events_requested, event_selected, event_sign_in, event_sign_out } from '../actions/types';

const INITIAL_STATE = {
  events: [],
  selectedEvent: null,
  viewedEvents: [],
  signedInEvent: null
}

const EventsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case events_requested:
      return { ...state, events: action.payload };
    case event_selected: 
      const events = [ action.payload, ...state.viewedEvents ].slice(0,3);
      return { ...state, selectedEvent: action.payload, viewedEvents: events };
    case event_sign_in: 
      return { ...state, signedInEvent: action.payload };
    case event_sign_out: 
      return { ...state, signedInEvent: null };
    default: return state;
  }
}

export default EventsReducer;