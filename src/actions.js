import {GET_AVAILABILITY, GET_CLOSED_DATES, GET_RESTAURANT_SETUP, HIDE_ERROR, SHOW_ERROR} from './constants';
import ResDiary from './services/ResDiary';

export const getClosedDates = () => {

  return dispatch => {

    dispatch({type: HIDE_ERROR});

    return dispatch({
      type: GET_CLOSED_DATES,
      payload: ResDiary.getClosedDates()
    })
      .catch(err => {
        dispatch({type: SHOW_ERROR});

        console.log(err);
      });
  }
};

export const getRestaurantSetup = () => {

  return dispatch => {

    dispatch({type: HIDE_ERROR});

    return dispatch({
      type: GET_RESTAURANT_SETUP,
      payload: ResDiary.getRestaurantSetup()
    })
      .catch(err => {
        dispatch({type: SHOW_ERROR});

        console.log(err);
      });
  }
};

export const getAvailability = (data) => {

  return dispatch => {

    dispatch({type: HIDE_ERROR});

    return dispatch({
      type: GET_AVAILABILITY,
      payload: ResDiary.getAvailability(data)
    })
      .catch(err => {
        dispatch({type: SHOW_ERROR});

        console.log(err);
      });
  }
};