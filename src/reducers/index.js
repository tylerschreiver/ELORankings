import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EventsReducer from './EventsReducer';


export default combineReducers({
  AuthReducer, EventsReducer
});