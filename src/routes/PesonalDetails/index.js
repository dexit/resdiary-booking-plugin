import React from 'react';
import ProposedReservation from '../../components/ProposedReservation';
import PersonalDetailsForm from './PersonalDetailsForm';
import {connect} from 'react-redux';
import {createBooking} from '../../actions';

const PersonalDetails = ({timeSlot, people, createBooking}) => {

  return (
    <section id="personal-details">
      <ProposedReservation timeSlot={timeSlot} people={people}/>
      <PersonalDetailsForm createBooking={createBooking}/>
    </section>
  );
};
//remove onsubmit
const mapStateToProps = state => {
  return {
    people: state.form.reservationDetails.values.people,
    timeSlot: state.timeSlot
  };
};

export default connect(mapStateToProps, {createBooking})(PersonalDetails);