import React, {Component} from 'react';
import ProposedReservation from '../../components/ProposedReservation';
import PersonalDetailsForm from './PersonalDetailsForm';
import {connect} from 'react-redux';
import {createBooking} from '../../actions';

class PersonalDetails extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="personal-details">
        <ProposedReservation timeSlot={this.props.timeSlot} people={this.props.people}/>
        <PersonalDetailsForm/>
      </section>
    );
  }


}

const mapStateToProps = state => {
  return {
    people: state.form.reservationDetails.values.people,
    timeSlot: state.timeSlot,
  };
};

export default connect(mapStateToProps, {createBooking})(PersonalDetails);