import ResDiary from './services/ResDiary';
import {submit} from 'redux-form';
import {
  CREATE_BOOKING,
  GET_AVAILABILITY,
  GET_CLOSED_DATES,
  GET_RESTAURANT_SETUP,
  HIDE_ERROR,
  SET_TERMS,
  SET_TIMESLOT,
  SHOW_ERROR
} from './constants';

export const getClosedDates = () => {

  return dispatch => {

    dispatch({type: HIDE_ERROR});

    return dispatch({
      type: GET_CLOSED_DATES,
      payload: ResDiary.getClosedDates()
    })
      .catch(err => {
        dispatch({type: SHOW_ERROR});

        console.log(err);
      });
  }
};

export const getRestaurantSetup = () => {

  return dispatch => {

    dispatch({type: HIDE_ERROR});

    return dispatch({
      type: GET_RESTAURANT_SETUP,
      payload: ResDiary.getRestaurantSetup()
    })
      .catch(err => {
        dispatch({type: SHOW_ERROR});

        console.log(err);
      });
  }
};

export const getAvailability = (data) => {

  return dispatch => {

    dispatch({type: HIDE_ERROR});

    return dispatch({
      type: GET_AVAILABILITY,
      payload: ResDiary.getAvailability(data)
    })
      .catch(err => {
        dispatch({type: SHOW_ERROR});

        console.log(err);
      });
  }
};

export const setTimeSlot = (timeSlot) => dispatch => {
  dispatch({type: SET_TIMESLOT, payload: timeSlot});
};

export const setTerms = (checked) => dispatch => {
  dispatch({type: SET_TERMS, payload: checked});
};

export const createBooking = (data) => {

  return dispatch => {

    dispatch({type: HIDE_ERROR});

    return dispatch({
      type: CREATE_BOOKING,
      payload: ResDiary.createBooking(data)
    })
      .then(() => this.props.history.push('/reservations/card-details'))
      .catch(err => {
        dispatch({type: SHOW_ERROR});

        console.log(err);
      });
  }
};

export const remoteSubmit = () => dispatch => dispatch(submit('personalDetails'));