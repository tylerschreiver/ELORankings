import { events_requested, event_selected, event_viewed } from '../actions/types';

const INITIAL_STATE = {
  events: [],
  selectedEvent: null,
  viewedEvents: []
}

const EventsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case events_requested:
      return { ...state, events: action.payload };
    case event_selected: 
      const events = [ action.payload, ...state.viewedEvents ].slice(0,3);
      return { ...state, selectedEvent: action.payload, viewedEvents: events };
    default: return state;
  }
}

export default EventsReducer;