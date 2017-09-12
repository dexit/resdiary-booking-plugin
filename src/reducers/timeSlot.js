import {SET_TIMESLOT} from '../constants';

const timeSlot = (state = {}, {type, payload}) => {
  switch (type) {
    case SET_TIMESLOT:
      return {...state, ...payload};
    default:
      return state;
  }
};

export default timeSlot;