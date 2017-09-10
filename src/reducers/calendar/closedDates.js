import {GET_CLOSED_DATES_FULFILLED, GET_CLOSED_DATES_PENDING, GET_CLOSED_DATES_REJECTED} from '../../constants';

const getIndex = day => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day);

const closedDates = (state = [], {type, payload}) => {
  switch (type) {
    case GET_CLOSED_DATES_PENDING:
      return state;
    case GET_CLOSED_DATES_FULFILLED:
      const daysOfWeek = payload.ClosedDays.map(day => getIndex(day));
      const closedPeriods = payload.ClosedPeriods.map(period => {
        return {
          from: new Date(period.StartDate),
          to: new Date(period.EndDate)
        }
      });

      return [...closedPeriods, {daysOfWeek}];
    case GET_CLOSED_DATES_REJECTED:
      return state;
    default:
      return state;
  }
};

export default closedDates;
