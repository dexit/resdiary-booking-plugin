import React from 'react';
import moment from 'moment';

const ProposedReservation = ({timeSlot, people}) => {
  return (
    <ul id="proposed-reservation">
      <li id="date">{moment(timeSlot.time).format('dddd Do MMMM YYYY')}</li>
      <li id="people"><span>{people}</span> people</li>
      <li id="time"><span>{moment.utc(timeSlot.time).format('HH.mm')}</span>HRS</li>
      <li id="area">{timeSlot.area.name}</li>
    </ul>
  );
};

export default ProposedReservation;
