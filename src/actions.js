import ResDiary from './services/ResDiary';
import {
  CREATE_BOOKING,
  CREATE_BOOKING_PAYMENT_VALID,
  CREATE_BOOKING_STRIPE_TOKEN,
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
      .catch(err => dispatch({type: SHOW_ERROR, payload: err}));

  };
};

export const getRestaurantSetup = () => {

  return dispatch => {

    dispatch({type: HIDE_ERROR});

    return dispatch({
      type: GET_RESTAURANT_SETUP,
      payload: ResDiary.getRestaurantSetup()
    })
      .catch(err => dispatch({type: SHOW_ERROR, payload: err}));

  };
};

export const getAvailability = (data) => {

  return dispatch => {

    dispatch({type: HIDE_ERROR});

    return dispatch({
      type: GET_AVAILABILITY,
      payload: ResDiary.getAvailability(data)
    })
      .catch(err => dispatch({type: SHOW_ERROR, payload: err}));

  };
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
      .catch(err => dispatch({type: SHOW_ERROR, payload: err.message}));
  };
};

export const paymentDetailsVaild = (isValid) => dispatch => {
  return dispatch({type: CREATE_BOOKING_PAYMENT_VALID, payload: isValid});
};

export const getStripeToken = (stripe) => {

  return dispatch => {

    dispatch({type: HIDE_ERROR});

    return dispatch({
      type: CREATE_BOOKING_STRIPE_TOKEN,
      payload: stripe.createToken()
        .then(res => {
          if (res.error) throw err;
          return res.token;
        })
    })
      .catch(err => dispatch({type: SHOW_ERROR, payload: err.message}));
  };
};
