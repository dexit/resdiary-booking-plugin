import {RESET_TIMESLOT, SET_TIMESLOT} from '../constants';

const timeSlot = (state = {}, {type, payload}) => {
  switch (type) {
    case SET_TIMESLOT:
      return {...state, ...payload};
    case RESET_TIMESLOT:
      return {};
    default:
      return state;
  }
};

export default timeSlot;