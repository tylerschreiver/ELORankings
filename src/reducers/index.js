import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EventsReducer from './EventsReducer';
import SetReducer from './SetReducer';
import UsersReducer from './UsersReducer';


export default combineReducers({
  AuthReducer, 
  EventsReducer, 
  SetReducer,
  UsersReducer
});