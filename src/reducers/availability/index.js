import {GET_AVAILABILITY_FULFILLED, GET_AVAILABILITY_REJECTED} from '../../constants';

const availability = (state = {}, {type, payload}) => {
  switch (type) {
    case GET_AVAILABILITY_FULFILLED:
      return payload;
    case GET_AVAILABILITY_REJECTED:
      return state;
    default:
      return state;
  }
};

export default availability;
