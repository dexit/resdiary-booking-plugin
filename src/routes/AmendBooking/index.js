import React from 'react';

const AmendBooking = props => {
  return (
    <section id="submit-reference">
      <div>
        <p>To change your reservation, please enter your booking reference number which can be found in your
          confirmation email we sent you.
        </p>
        <input type="text" placeholder="Booking reference"/>
        <button id="amend-button" type="button">Submit</button>
      </div>
    </section>
  );
};

export default AmendBooking;
