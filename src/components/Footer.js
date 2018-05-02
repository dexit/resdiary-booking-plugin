import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { changeDateClicked, createBooking, updateBooking } from '../actions';

const Footer = props => {
	const {
		error,
		location,
		page,
		timeSlot,
		termsAgreed,
		marketingOptIn,
		personalDetailsForm,
		paymentValid,
		bookingPending,
		bookingAmending,
		bookingComplete,
		createBooking,
		updateBooking,
		reservationDetails,
		booking,
		history,
		stripe,
		confirmingBooking,
		changeDateClicked
	} = props;
	const nextRoutes = [
		['/reservations/reservation-details', '/reservations/confirm-reservation'],
		['/reservations/confirm-reservation', '/reservations/personal-details'],
		['/reservations/personal-details', '/reservations/card-details'],
		['/reservations/card-details', '/reservations/reservation-confirmed']
	];
	const nextRouteMap = new Map(nextRoutes);
	const nextLink = nextRouteMap.get(location.pathname);
	const isDisabled = () => {
		if (bookingPending) {
			return true;
		}

		switch (nextLink) {
			case '/reservations/confirm-reservation':
				return !timeSlot.time;
			case '/reservations/personal-details':
				return !termsAgreed;
			case '/reservations/reservation-confirmed':
				return !paymentValid;
			default:
				return false;
		}
	};
	const linkText = () => {
		const nextPaths = ['/reservations/confirm-reservation', '/reservations/personal-details'];
		if (nextPaths.includes(nextLink)) {
			return 'Next';
		}
		return 'Confirm';
	};
	const formValid = () => {
		if (nextLink === '/reservations/card-details') {
			const values = personalDetailsForm.values;

			if (!values) return;

			if (
				!values.email ||
				!values.firstName ||
				!values.lastName ||
				!values.tel ||
				!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) ||
				values.email !== values.confirmEmail
			) {
				return;
			}
		}
		return true;
	};
	const handleClick = e => {
		if (isDisabled() || !formValid()) {
			e.preventDefault();
			return;
		}

		if (bookingAmending && !confirmingBooking) {
			const data = {
				...reservationDetails.values,
				timeSlot,
				bookingRef: booking.Booking.Reference
			};
			e.preventDefault();
			updateBooking(data);
			return;
		}

		if (nextLink === '/reservations/reservation-confirmed') {
			e.preventDefault();
			document.getElementById('stripe-form-submit').click();
		}

		if (nextLink === '/reservations/card-details') {
			if (stripe) {
				history.push('/reservations/card-details');
			} else {
				const data = {
					...reservationDetails.values,
					...personalDetailsForm.values,
					timeSlot,
					marketingOptIn
				};
				e.preventDefault();
				createBooking(data);
			}
		}
	};
	const hideFooter = () => {
		const hideForRoute = ['/reservations/your-reservation'];
		return bookingComplete || !page || hideForRoute.includes(location.pathname);
	};

	return hideFooter() ? null : (
		<footer>
			<Link
				id="prev-button"
				to="/reservations/reservation-details"
				className={
					page === 1 || location.pathname === '/reservations/amend-booking' ? 'button-hidden' : 'button-visible'
				}
				onClick={changeDateClicked}
			>
				Change date
			</Link>
			<Link
				id="next-button"
				className={
					(isDisabled() || !formValid() ? 'disabled' : '') +
					(location.pathname === '/reservations/amend-booking' ? ' button-hidden' : ' button-visible')
				}
				to={nextLink || ''}
				onClick={handleClick}
			>
				{linkText()}
			</Link>
			{error.error && (
				<p id="error-message">
					Oops! There has been an error.
					<span id="error-description">{error.message}</span>
				</p>
			)}
		</footer>
	);
};

const mapStateToProps = state => {
	return {
		error: state.error,
		timeSlot: state.timeSlot,
		termsAgreed: state.termsAgreed,
		marketingOptIn: state.marketingOptIn,
		personalDetailsForm: state.form.personalDetails,
		bookingPending: state.booking.pending,
		bookingComplete: state.booking.complete,
		bookingAmending: state.booking.amending,
		confirmingBooking: state.booking.confirmingBooking,
		booking: state.booking,
		paymentValid: state.booking.paymentValid,
		reservationDetails: state.form.reservationDetails,
		stripe: state.booking.stripeKey,
		page: state.page
	};
};

export default withRouter(connect(mapStateToProps, { createBooking, updateBooking, changeDateClicked })(Footer));
