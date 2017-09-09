import {GET_CLOSED_DATES_FULFILLED, GET_CLOSED_DATES_PENDING, GET_CLOSED_DATES_REJECTED} from '../../constants';

const closedDates = (state = {}, {type, payload}) => {
  switch (type) {
    case GET_CLOSED_DATES_PENDING:
      return state;
    case GET_CLOSED_DATES_FULFILLED:
      return payload;
    case GET_CLOSED_DATES_REJECTED:
      return state;
    default:
      return state;
  }
};

export default closedDates;
