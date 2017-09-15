import {
  CREATE_BOOKING_FULFILLED,
  CREATE_BOOKING_PAYMENT_VALID,
  CREATE_BOOKING_PENDING,
  CREATE_BOOKING_REJECTED,
  CREATE_BOOKING_STRIPE_TOKEN_FULFILLED,
  CREATE_BOOKING_STRIPE_TOKEN_PENDING,
  CREATE_BOOKING_STRIPE_TOKEN_REJECTED
} from '../constants';

const initialState = {
  pending: false,
  complete: false,
  paymentValid: false,
  stripe: {},
  booking: {}
};

const booking = (state = initialState, {type, payload}) => {
  switch (type) {
    case CREATE_BOOKING_PENDING:
      return {...state, pending: true};
    case CREATE_BOOKING_FULFILLED:
      return {...state, pending: false, complete: true, booking: payload};
    case CREATE_BOOKING_REJECTED:
      return {...state, pending: false};
    case CREATE_BOOKING_PAYMENT_VALID:
      return {...state, paymentValid: payload};
    case CREATE_BOOKING_STRIPE_TOKEN_PENDING:
      return {...state, pending: true};
    case CREATE_BOOKING_STRIPE_TOKEN_FULFILLED:
      return {...state, pending: false, stripe: payload};
    case CREATE_BOOKING_STRIPE_TOKEN_REJECTED:
      return {...state, pending: false};
    default:
      return state;
  }
};

export default booking;