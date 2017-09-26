import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProposedReservation from '../../components/ProposedReservation';
import {setPage, setTerms} from '../../actions';
import {ReservationConfirmedText} from 'textTemplates';

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
            <ReservationConfirmedText/>
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