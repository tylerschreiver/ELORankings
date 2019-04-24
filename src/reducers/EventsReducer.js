import { events_requested, event_selected, event_sign_in, event_sign_out, create_event } from '../actions/types';

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
    case event_selected: {
      // console.log(state.viewedEvents.includes(action.payload))
      if (state.viewedEvents && state.viewedEvents.length) {
        const eventNames = state.viewedEvents.map(event => event.name);
        if (eventNames.indexOf(action.payload.name) === -1) {
          const events = [ action.payload, ...state.viewedEvents ].slice(0,3);
          return { ...state, selectedEvent: action.payload, viewedEvents: events };
        }
      } else return { ...state, selectedEvent: action.payload, viewedEvents: [ action.payload ] };
      return {  ...state, selectedEvent: action.payload };
    }
    case event_sign_in: 
      return { ...state, signedInEvent: action.payload };
    case event_sign_out: 
      return { ...state, signedInEvent: null };
    case create_event:
      let events = [];
      if (state.events && state.events.length) {
        events = [...state.events];
        events.unshift(action.payload)
      } else events = [action.payload];
      return { ...state, events };
    default: return state;
  }
}

export default EventsReducer;