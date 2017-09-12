import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link, Route} from 'react-router-dom';

const Footer = ({error, timeSlot, termsAgreed}) => {

  const resDetailsNext = () => {
    if (timeSlot) {
      return <Link id="next-button" to="/reservations/confirm-reservation">Next</Link>;
    }
    return null;
  };

  const confirmNext = () => {
    if (termsAgreed) {
      return <Link id="next-button" to="/reservations/personal-details">Confirm</Link>;
    }
    return null;
  };

  return (
    <footer>
      <button id="prev-button" type="button">Previous</button>
      <Route exact path='/reservations/reservation-details' component={resDetailsNext}/>
      <Route exact path='/reservations/confirm-reservation' component={confirmNext}/>
      {error && <p id="error-message">Oops! There has been an error.</p>}
    </footer>
  );
};

const mapStateToProps = state => {
  return {
    error: state.error.error,
    timeSlot: state.timeSlot.time,
    termsAgreed: state.termsAgreed
  };
};

export default withRouter(connect(mapStateToProps)(Footer));
{/*<span id="error-description"></span>*/}