import { events_requested, event_selected } from '../actions/types';

const INITIAL_STATE = {
  events: [],
  selectedEvent: null
}

const EventsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case events_requested:
      return { ...state, events: action.payload };
    case event_selected: 
      return { ...state, selectedEvent: action.payload };
    default: return state;
  }
}

export default EventsReducer;