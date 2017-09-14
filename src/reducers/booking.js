import {CREATE_BOOKING_FULFILLED, CREATE_BOOKING_REJECTED} from '../constants';

const booking = (state = {pending: false}, {type, payload}) => {
  switch (type) {
    case CREATE_BOOKING_FULFILLED:
      return {pending: true, ...payload};
    case CREATE_BOOKING_REJECTED:
      return state;
    default:
      return state;
  }
};

export default booking;