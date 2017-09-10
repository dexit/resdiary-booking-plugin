import React from 'react';
import DayPicker from 'react-day-picker';

const Calendar = props => {
  const {handleDayClick, disabledDays, toMonth} = props;

  return (
    <div>
      <DayPicker
        onDayClick={handleDayClick}
        disabledDays={disabledDays}
        fromMonth={new Date()}
        toMonth={toMonth}
      />
      <ul id="calendar-key">
        <li id="unavailable">Unavailable</li>
        <li id="available">Available</li>
      </ul>
      <select name="people">
        <option selected disabled value="">No. of people</option>
      </select>
      <select name="sitting">
        <option selected disabled value="">Sitting</option>
      </select>
      <button type="button">Search Times</button>
    </div>
  );
};


export default Calendar;
