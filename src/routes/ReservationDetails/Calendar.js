import React from 'react';
import DayPicker from 'react-day-picker';
import {Field, reduxForm} from 'redux-form'

const Calendar = props => {
  const peopleSelect = [];
  const {
    handleDayClick,
    disabledDays,
    toMonth,
    handleSubmit,
    minPartySize,
    maxPartySize,
    services,
    selectedDay,
    people,
    sitting,
    handlePeopleChange,
    handleSittingChange
  } = props;

  for (let i = minPartySize; i <= maxPartySize; i++) {
    peopleSelect.push(<option key={`people-select-${i}`} value={i}>{i}</option>)
  }

  return (
    <form onSubmit={handleSubmit}>
      <DayPicker
        onDayClick={handleDayClick}
        disabledDays={disabledDays}
        selectedDays={selectedDay}
        fromMonth={new Date()}
        toMonth={toMonth}
      />
      <ul id="calendar-key">
        <li id="unavailable">Unavailable</li>
        <li id="available">Available</li>
      </ul>
      <Field name="people" component="select" onChange={handlePeopleChange}>
        <option disabled defaultValue>No. of people</option>
        {peopleSelect}
      </Field>
      <Field name="sitting" component="select" onChange={handleSittingChange}>
        <option disabled defaultValue>Sitting</option>
        {services.map(svc => <option key={svc.ServiceId} value={svc.ServiceId}>{svc.Name}</option>)}
      </Field>
      <button type="submit" disabled={!selectedDay || !people || !sitting}>
        Search Times
      </button>
    </form>
  );
};

export default reduxForm({form: 'reservationDetails'})(Calendar)