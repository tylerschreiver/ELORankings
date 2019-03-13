import { events_requested } from '../actions/types';

const INITIAL_STATE = {
  events: []
}

const EventsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case events_requested:
      return { ...state, events: action.payload };
    default: return state;
  }
}

export default EventsReducer;