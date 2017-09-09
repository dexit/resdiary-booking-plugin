import React from 'react';
import {Link} from 'react-router-dom';

const BookingOptions = props => {
  return (
    <section id="make-reservation">
      <div>
        <p>I would like to:</p>
        <ul>
          <li>
            <Link to="/reservations/reservation-details">Make a new reservation</Link>
          </li>
          <li>
            <Link to="/reservations/amend-booking">Manage by exsisting reservation</Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default BookingOptions;
