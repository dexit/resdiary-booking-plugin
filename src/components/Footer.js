import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link, Route} from 'react-router-dom';
import {remoteSubmit} from '../actions'

const Footer = ({error, location, timeSlot, termsAgreed, personalDetailsForm, remoteSubmit}) => {
  const nextRoutes = [
    ['/reservations/reservation-details', '/reservations/confirm-reservation'],
    ['/reservations/confirm-reservation', '/reservations/personal-details'],
    ['/reservations/personal-details', '/reservations/card-details'],
    ['/reservations/card-details', '/reservations/reservation-confirmed'],
  ];
  const nextRouteMap = new Map(nextRoutes);
  const nextLink = nextRouteMap.get(location.pathname);
  const isDisabled = () => {
    switch (nextLink) {
      case '/reservations/confirm-reservation':
        return !timeSlot;
      case '/reservations/personal-details':
        return !termsAgreed;
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
      if (!values) return;

      for (let value of Object.keys(values)) {
        if (!values[value]) return;
      }

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

    if (nextLink === '/reservations/card-details') {
      e.preventDefault();
      remoteSubmit();
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
        {error && <p id="error-message">Oops! There has been an error.</p>}
      </footer>
    )
  };

  return <Route path="/reservations/(.*)" component={Footer}/>;
};

const mapStateToProps = state => {
  return {
    error: state.error.error,
    timeSlot: state.timeSlot.time,
    termsAgreed: state.termsAgreed,
    personalDetailsForm: state.form.personalDetails
  };
};

export default withRouter(connect(mapStateToProps, {remoteSubmit})(Footer));
{/*<span id="error-description"></span>*/}