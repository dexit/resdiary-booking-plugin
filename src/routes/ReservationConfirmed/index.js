import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProposedReservation from '../../components/ProposedReservation';
import {setPage, setTerms} from '../../actions';

class ReservationConfirmed extends Component {

  componentWillMount() {
    this.props.setPage(5);
  }

  render() {
    const {people, timeSlot, bookingRef} = this.props;

    return (
      <section id="confirm-reservation">
        <div>
          <ProposedReservation timeSlot={timeSlot} people={people}/>
          <div className="text-container">
            <dl id="booking-reference">
              <dt>Booking Reference Number</dt>
              <dd>{bookingRef}</dd>
            </dl>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </section>
    );
  }
};

const mapStateToProps = state => {
  return {
    people: state.form.reservationDetails.values.people,
    timeSlot: state.timeSlot,
    bookingRef: state.booking.Booking.Reference
  };
};

export default connect(mapStateToProps, {setTerms, setPage})(ReservationConfirmed);