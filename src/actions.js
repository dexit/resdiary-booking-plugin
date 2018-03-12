import ResDiary from './services/ResDiary';
import {initialize, reset} from 'redux-form';
import {
  CHANGE_DATE_CLICKED,
  CONFIRM_BOOKING,
  CREATE_BOOKING,
  CREATE_BOOKING_PAYMENT_VALID,
  CREATE_BOOKING_STRIPE_TOKEN,
  GET_AVAILABILITY,
  GET_BOOKING,
  GET_CLOSED_DATES,
  GET_RESTAURANT_SETUP,
  GET_CUSTOMER_CODES,
  HIDE_ERROR,
  PAGE_NUMBER,
  RESET_AVAILABILITY,
  RESET_INITIAL_FORM_STATE,
  RESET_TIMESLOT,
  SET_AMEND_BOOKING,
  SET_INITIAL_FORM_STATE,
  SET_TERMS,
  SET_TIMESLOT,
  SHOW_ERROR,
  UPDATE_BOOKING
} from './constants';

const handleErr = dispatch => {
  return err => dispatch({type: SHOW_ERROR, payload: err.message || err});
};

export const getClosedDates = () => {
  return dispatch => {
    dispatch({type: HIDE_ERROR});

    return dispatch({
      type: GET_CLOSED_DATES,
      payload: ResDiary.getClosedDates()
    }).catch(handleErr(dispatch));
  };
};

export const getRestaurantSetup = () => {
  return dispatch => {
    dispatch({type: HIDE_ERROR});

    return dispatch({
      type: GET_RESTAURANT_SETUP,
      payload: ResDiary.getRestaurantSetup()
    }).catch(handleErr(dispatch));
  };
};

export const getCustomerCodes = () => {
  return dispatch => {
    dispatch({type: HIDE_ERROR});

    return dispatch({
      type: GET_CUSTOMER_CODES,
      payload: ResDiary.getCustomerCodes()
    }).catch(handleErr(dispatch));
  };
};

export const getAvailability = (data, service) => {
  return dispatch => {
    dispatch({type: HIDE_ERROR});

    return dispatch({
      type: GET_AVAILABILITY,
      payload: ResDiary.getAvailability(data),
      meta: {service}
    }).catch(handleErr(dispatch));
  };
};

export const setTimeSlot = timeSlot => dispatch => {
  dispatch({type: SET_TIMESLOT, payload: timeSlot});
};

export const setTerms = checked => dispatch => {
  dispatch({type: SET_TERMS, payload: checked});
};

export const createBooking = data => {
  return dispatch => {
    dispatch({type: HIDE_ERROR});

    return dispatch({
      type: CREATE_BOOKING,
      payload: ResDiary.createBooking(data)
    }).catch(handleErr(dispatch));
  };
};

export const paymentDetailsValid = isValid => dispatch => {
  return dispatch({type: CREATE_BOOKING_PAYMENT_VALID, payload: isValid});
};

export const getStripeToken = stripe => {
  return dispatch => {
    dispatch({type: HIDE_ERROR});

    return dispatch({
      type: CREATE_BOOKING_STRIPE_TOKEN,
      payload: stripe.createToken().then(res => {
        if (res.error) throw res.error;
        return res.token;
      })
    }).catch(handleErr(dispatch));
  };
};

export const setPage = page => dispatch => {
  dispatch({type: PAGE_NUMBER, payload: page});
};

export const setAmendBooking = amendBooking => dispatch => {
  dispatch({type: SET_AMEND_BOOKING, payload: amendBooking});
};

export const getBooking = data => {
  return dispatch => {
    dispatch({type: HIDE_ERROR});

    return dispatch({
      type: GET_BOOKING,
      payload: ResDiary.getBooking(data)
    }).catch(err => {
      if (err.response && err.response.status === 404) {
        dispatch({type: SHOW_ERROR, payload: 'Booking not found!'});
      } else {
        dispatch({type: SHOW_ERROR, payload: err.message || err});
      }
    });
  };
};

export const setInitialFormState = initialValues => dispatch => {
  dispatch({type: SET_INITIAL_FORM_STATE, payload: initialValues});
};

export const resetInitialFormState = () => dispatch => {
  dispatch({type: RESET_INITIAL_FORM_STATE});
};

export const resetAvailability = () => dispatch => {
  dispatch({type: RESET_AVAILABILITY});
};

export const reInitForm = formName => dispatch => {
  dispatch(initialize(formName));
};

export const updateBooking = data => {
  return dispatch => {
    dispatch({type: HIDE_ERROR});

    return dispatch({
      type: UPDATE_BOOKING,
      payload: ResDiary.updateBooking(data)
    }).catch(handleErr(dispatch));
  };
};

export const confirmBooking = data => {
  return dispatch => {
    dispatch({type: HIDE_ERROR});

    return dispatch({
      type: CONFIRM_BOOKING,
      payload: ResDiary.confirmBooking(data)
    }).catch(handleErr(dispatch));
  };
};

export const resetForm = formName => dispatch => {
  dispatch(reset(formName));
};

export const resetTimeSlot = () => dispatch => {
  dispatch({type: RESET_TIMESLOT});
};

export const changeDateClicked = () => dispatch => {
  dispatch({type: CHANGE_DATE_CLICKED});
};
