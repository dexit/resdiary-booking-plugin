import React from 'react';

const YourReservation = props => {
  return (
    <section id="amend-reservation">
      <div>
        <p>Hi <span>Name</span>!</p>
        <dl id="booking-reference">
          <dt>Booking Reference Number</dt>
          <dd>B2344</dd>
        </dl>
        <p>If you would like to change your reservation details please do so by clicking on the edit options
          below.</p>
        <dl id="booking-details">
          <dt>Date</dt>
          <dd><span>Thursday 12th February 2018</span>
            <button type="button">edit</button>
          </dd>
          <dt>Sitting</dt>
          <dd><span>Evening</span>
            <button type="button">edit</button>
          </dd>
          <dt>No. of people</dt>
          <dd><span>22</span>
            <button type="button">edit</button>
          </dd>
          <dt>Time</dt>
          <dd><span>18:00</span>
            <button type="button">edit</button>
          </dd>
        </dl>
      </div>
    </section>
  );
};

export default YourReservation;
