import { events_requested, event_selected, event_sign_in, event_sign_out, create_event } from '../actions/types';

const INITIAL_STATE = {
  events: [{
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
  }],
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