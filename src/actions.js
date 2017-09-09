import {GET_CLOSED_DATES} from './constants';
import ResDiary from './services/ResDiary';

export const getClosedDates = () => {
  return dispatch => dispatch({
    type: GET_CLOSED_DATES,
    payload: ResDiary.getClosedDates()
  })
    .catch(err => console.log(err));
};
