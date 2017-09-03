import {GET_CLOSED_DATES} from './constants';
import ResDiary from './services/ResDiary';

export const ResDiaryinit = (tokenRequest, proxy, restaurant) => {
  return {
    type: GET_CLOSED_DATES,
    payload: ResDiary.init(tokenRequest, proxy, restaurant).catch(err => console.log(err))
  };
};
