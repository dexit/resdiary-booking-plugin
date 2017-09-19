import React from 'react';
import {Route} from 'react-router-dom';
import ProgressBar from './ProgressBar';

const newBookingHeadings = [
  'Make A Reservation',
  'Make A Reservation',
  'Your Reservation Time',
  'Your Details',
  'Card Details',
  'Reservation Confirmation'
];
const amendBookingHeadings = [
  'Make A Reservation',
  'Change The Date & Time',
  'Manage Your Reservation',
  'Your Reservation',
  '',
  'Reservation Confirmation'
];

const Header = ({page, amendBooking}) => {
  return (
    <header>
      <h1 className="header-title">{amendBooking ? amendBookingHeadings[page] : newBookingHeadings[page]}</h1>
      {!page && <p>You're just a minute away from booking your table at the Empress!</p>}
      {!amendBooking && <Route path="/reservations/(.*)" render={() => <ProgressBar page={page}/>}/>}
    </header>
  );
};

export default Header;



