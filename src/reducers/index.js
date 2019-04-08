import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EventsReducer from './EventsReducer';
import SetReducer from './SetReducer';


export default combineReducers({
  AuthReducer, EventsReducer, SetReducer
});