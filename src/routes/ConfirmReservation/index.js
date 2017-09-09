import React from 'react';

const ConfirmReservation = props => {
  return (
    <section id="confirm-reservation">
      <div>
        <ul id="proposed-reservation">
          <li id="date">Tuesday 12th February 2018</li>
          <li id="people"><span>22</span> people</li>
          <li id="time"><span>18:00</span>HRS</li>
          <li id="area">Pub Table</li>
        </ul>
        <div className="text-container">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </p>
          <p>
            <input type="checkbox" name="terms" value="agree"/>
            <label htmlFor="terms">I accept the terms and conditions</label>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConfirmReservation;
