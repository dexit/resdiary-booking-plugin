import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link, Route} from 'react-router-dom';

const Footer = ({error, location, timeSlot, termsAgreed, personalDetailsForm, paymentValid, bookingPending}) => {
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
    const showNext = ['/reservations/confirm-reservation', '/reservations/personal-details'];

    return showNext.includes(nextLink) ? 'Next' : 'Confirm'
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

    if (nextLink === '/reservations/reservation-confirmed') {
      e.preventDefault();
      document.getElementById('stripe-form').click();
    }

  };

  const Footer = () => {
    return (
      <footer>
        <button id="prev-button" type="button">Previous</button>
        <Link
          id="next-button"
          className={isDisabled() || !formValid() ? "disabled" : null}
          to={nextLink}
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

  return <Route path="/reservations/(.*)" component={Footer}/>;
};

const mapStateToProps = state => {
  return {
    error: state.error,
    timeSlot: state.timeSlot,
    termsAgreed: state.termsAgreed,
    personalDetailsForm: state.form.personalDetails,
    bookingPending: state.booking.pending,
    paymentValid: state.booking.paymentValid
  };
};

export default withRouter(connect(mapStateToProps)(Footer));
