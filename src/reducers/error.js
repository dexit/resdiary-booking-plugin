import {HIDE_ERROR, SHOW_ERROR} from '../constants';

const error = (state = {error: false, message: ''}, {type, payload}) => {
  switch (type) {
    case SHOW_ERROR:
      return {error: true, message: payload};
    case HIDE_ERROR:
      return {error: false, message: ''};
    default:
      return state;
  }
};

export default error;
