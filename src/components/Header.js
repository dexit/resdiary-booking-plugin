import React from 'react';
import {Route, Link} from 'react-router-dom';

const ProgressBar = props => (
  <ul id="progress-bar">
    <li>
      <button type="button"></button>
    </li>
    <li>
      <button type="button" disabled></button>
    </li>
  </ul>
);

const Header = props => {
  return (
    <header>
      <h1 className="header-title">Make a reservation</h1>
      <p>You're just a minute away from booking your table at the Empress!</p>
      <Route path="/reservations/(.*)" component={ProgressBar}/>
    </header>
  );
};

export default Header;



