import {GET_AVAILABILITY_FULFILLED, GET_AVAILABILITY_REJECTED, RESET_AVAILABILITY} from '../constants';

const availability = (state = [], {type, payload, meta}) => {

  switch (type) {
    case GET_AVAILABILITY_FULFILLED:
      for (let area of  payload) {
        area.TimeSlots = area.TimeSlots.filter(ts => ts.ServiceId === meta.service);
      }
      return payload;
    case GET_AVAILABILITY_REJECTED:
      return state;
    case RESET_AVAILABILITY:
      return [];
    default:
      return state;
  }
};

export default availability;
