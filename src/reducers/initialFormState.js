import {RESET_INITIAL_FORM_STATE, SET_INITIAL_FORM_STATE} from '../constants';

const initialState = {
  people: 'No. of people',
  sitting: ''
};

const initialFormState = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_INITIAL_FORM_STATE:
      return {...state, ...payload};
    case RESET_INITIAL_FORM_STATE:
      return initialState;
    default:
      return state;
  }
};

export default initialFormState;
