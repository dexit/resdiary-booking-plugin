import {GET_RESTAURANT_SETUP_FULFILLED, GET_RESTAURANT_SETUP_REJECTED} from '../constants';

const restaurant = (state = {}, {type, payload}) => {
  switch (type) {
    case GET_RESTAURANT_SETUP_FULFILLED:
      return {...payload};
    case GET_RESTAURANT_SETUP_REJECTED:
      return state;
    default:
      return state;
  }
};

export default restaurant;
