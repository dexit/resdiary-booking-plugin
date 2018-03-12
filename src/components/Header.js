import React from 'react';
import { Route } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { HeaderText } from 'textTemplates';

const newBookingHeadings = [
	'Make A Reservation',
	'Make A Reservation',
	'Your Reservation',
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

const Header = ({ page, amendBooking }) => {
	return (
		<header>
			<h1 className="header-title">{amendBooking ? amendBookingHeadings[page] : newBookingHeadings[page]}</h1>
			{!page && <HeaderText />}
			{!amendBooking && <Route path="/reservations/(.*)" render={() => <ProgressBar page={page} />} />}
		</header>
	);
};

export default Header;
