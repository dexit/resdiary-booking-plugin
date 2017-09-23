import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {createBooking, updateBooking} from '../actions';

const Footer = props => {
  const {
    error,
    location,
    page,
    timeSlot,
    termsAgreed,
    personalDetailsForm,
    paymentValid,
    bookingPending,
    bookingAmending,
    bookingComplete,
    createBooking,
    updateBooking,
    reservationDetails,
    booking
  } = props;
  const nextRoutes = [
    ['/reservations/reservation-details', '/reservations/confirm-reservation'],
    ['/reservations/confirm-reservation', '/reservations/personal-details'],
    ['/reservations/personal-details', '/reservations/card-details'],
    ['/reservations/card-details', '/reservations/reservation-confirmed'],
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
    if (nextPaths.includes(nextLink) && !bookingAmending) {
      return 'Next'
    }
    return 'Confirm'

  };
  const formValid = () => {
    if (nextLink === '/reservations/card-details') {
      const values = personalDetailsForm.values;

      if (!values || Object.keys(values).length < 4) return;

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        return;
      }
    }
    return true;
  };
  const handleClick = (e) => {
    if (isDisabled() || !formValid()) {
      e.preventDefault();
      return;
    }

    if (bookingAmending) {
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
      document.getElementById('stripe-form').click();
    }

    if (nextLink === '/reservations/card-details') {
      const data = {
        ...reservationDetails.values,
        ...personalDetailsForm.values,
        timeSlot
      };
      e.preventDefault();
      createBooking(data);
    }

  };
  const hideFooter = () => {
    const hideForRoute = ['/reservations/amend-booking', '/reservations/your-reservation'];
    return bookingComplete || !page || hideForRoute.includes(location.pathname);
  };

  return hideFooter() ? null : (
    <footer>
      <Link
        id="prev-button"
        to='/reservations/reservation-details'
        className={page === 1 ? 'button-hidden' : 'button-visible'}
      >
        Change date
      </Link>
      <Link
        id="next-button"
        className={isDisabled() || !formValid() ? "disabled" : null}
        to={nextLink || ''}
        onClick={handleClick}
      >
        {linkText()}
      </Link>
      {error.error &&
      <p id="error-message">
        Oops! There has been an error.
        <span id="error-description">{error.message}</span>
      </p>}
    </footer>
  )
};


const mapStateToProps = state => {
  return {
    error: state.error,
    timeSlot: state.timeSlot,
    termsAgreed: state.termsAgreed,
    personalDetailsForm: state.form.personalDetails,
    bookingPending: state.booking.pending,
    bookingComplete: state.booking.complete,
    bookingAmending: state.booking.amending,
    booking: state.booking,
    paymentValid: state.booking.paymentValid,
    reservationDetails: state.form.reservationDetails,
    stripe: state.booking.stripe,
    page: state.page
  };
};

export default withRouter(connect(mapStateToProps, {createBooking, updateBooking})(Footer));
