import {combineReducers} from 'redux';
import calendar from './calendar';
import error from './error';
import restaurant from './restaurant';


export default combineReducers({
  restaurant,
  calendar,
  error
});
