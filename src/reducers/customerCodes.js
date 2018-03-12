import {GET_CUSTOMER_CODES_FULFILLED, GET_CUSTOMER_CODES_REJECTED} from '../constants';

const customerCodes = (state = [], {type, payload}) => {
  switch (type) {
    case GET_CUSTOMER_CODES_FULFILLED:
      return payload;
    case GET_CUSTOMER_CODES_REJECTED:
      return state;
    default:
      return state;
  }
};

export default customerCodes;
