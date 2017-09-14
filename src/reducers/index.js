import {combineReducers} from 'redux';
import calendar from './calendar';
import error from './error';
import restaurant from './restaurant';
import availability from './availability';
import timeSlot from './timeSlot';
import termsAgreed from './termsAgreed';
import booking from './booking';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  restaurant,
  calendar,
  error,
  availability,
  timeSlot,
  termsAgreed,
  booking,
  form: formReducer
});
