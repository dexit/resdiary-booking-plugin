import React from 'react';

const ReservationDetails = props => {
  return (
    <section id="reservation-details">
      <div>
        <div id="date-picker"></div>
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
      <div>
        <nav>
          <button type="button">Useful Info</button>
          <button type="button" disabled>Available Times</button>
        </nav>
        <div id="info">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.</p>
        </div>
        <dl id="available-times">
          <dt>Area name</dt>
          <dd>
            <button type="button">9:00PM</button>
            <button type="button">9:00PM</button>
            <button type="button">9:00PM</button>
          </dd>
          <dt>Area name</dt>
          <dd>
            <button type="button">9:00PM</button>
            <button type="button">9:00PM</button>
            <button type="button">9:00PM</button>
          </dd>
        </dl>
      </div>
    </section>
  );
};

export default ReservationDetails;
