import React, {Component} from 'react';
import ProposedReservation from '../../components/ProposedReservation';
import PersonalDetailsForm from './PersonalDetailsForm';
import {connect} from 'react-redux';
import {createBooking, setPage} from '../../actions';

class PersonalDetails extends Component {

  componentWillMount() {
    this.props.setPage(3);
  }


  componentWillReceiveProps(nextProps) {
    if (!this.props.stripeKey && nextProps.stripeKey) {
      this.props.history.push('/reservations/card-details');
    }
  }

  render() {
    return (
      <section id="personal-details">
        <div>
          <ProposedReservation timeSlot={this.props.timeSlot} people={this.props.people}/>
          <PersonalDetailsForm/>
        </div>
      </section>
    );
  }


}

const mapStateToProps = state => {
  return {
    people: state.form.reservationDetails.values.people,
    timeSlot: state.timeSlot,
    stripeKey: state.booking.stripeKey
  };
};

export default connect(mapStateToProps, {createBooking, setPage})(PersonalDetails);