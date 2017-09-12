import {HIDE_ERROR, SHOW_ERROR} from '../constants';

const error = (state = {error: false}, {type}) => {
  switch (type) {
    case SHOW_ERROR:
      return {error: true};
    case HIDE_ERROR:
      return {error: false};
    default:
      return state;
  }
};

export default error;
