import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAvailability, setPage, setTimeSlot} from '../../actions';
import moment from 'moment';
import Calendar from './Calendar';
import InfoSearchTimes from './InfoSearchTimes';
import {withRouter} from 'react-router';
import CustomEvent from 'custom-event';

class ReservationDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDay: (Object.keys(this.props.booking).length && new Date(this.props.booking.VisitDate)) || (this.props.timeSlot && new Date(this.props.timeSlot)) || null,
      peopleValue: (Object.keys(this.props.booking).length && this.props.booking.PartySize) || null,
      sittingValue: (this.props.reservationDetails && this.props.reservationDetails.values && this.props.reservationDetails.values.sitting) || null,
      tabIndex: this.props.availability.length ? 1 : 0,
      resetForm: !Object.keys(this.props.booking).length
    };
    this.maxPartySizeModal;
  }

  componentWillMount() {
    this.props.setPage(1);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.availability.length) {
      this.setState({tabIndex: 1})
    }

    if (nextProps.bookingComplete) {
      this.props.history.push('/reservations/reservation-confirmed');
    }
  }


  handleDayClick = (day, {selected, disabled}) => {
    if (disabled) return;

    this.setState({selectedDay: day});
  };

  disabledDays = () => {
    if (this.props.daysInAdvance) {
      return [...this.props.closedDates,
        {after: moment().add(this.props.daysInAdvance, 'days').toDate()},
        {before: moment().add(1, 'days').toDate()}
      ];
    }
    return [...this.props.closedDates, {before: moment().add(1, 'days').toDate()}];
  };

  handleSubmit = () => {
    const data = {
      VisitDate: this.state.selectedDay,
      PartySize: parseInt(this.state.peopleValue),
      Areas: this.props.Areas
    };
    if (this.props.booking && this.props.booking.Id) {
      data.BookingId = this.props.booking.Id;
    }
    this.props.setTimeSlot({time: ''});
    this.props.getAvailability(data, parseInt(this.state.sittingValue));
  };

  handlePeopleChange = e => {
    const value = e.currentTarget ? e.currentTarget.value : e;
    if (value === 'maxPartySizeModal') {
      const event = new CustomEvent('resdiary:maxPartySizeModal');
      this.maxPartySizeModal.dispatchEvent(event);
      return;
    }
    this.setState({peopleValue: value});
  };

  handleSittingChange = e => {
    const value = e.currentTarget ? e.currentTarget.value : e;
    this.setState({sittingValue: value});
  };

  handleTabSelect = tabIndex => this.setState({tabIndex});

  handleTimeSlotClick = e => {
    this.props.setTimeSlot(JSON.parse(e.currentTarget.value));
  };

  render() {
    return (
      <section id="reservation-details" ref={ref => this.maxPartySizeModal = ref}>
        <Calendar
          handleDayClick={this.handleDayClick}
          disabledDays={this.disabledDays()}
          toMonth={moment().add(this.props.daysInAdvance, 'days').toDate()}
          minPartySize={this.props.minPartySize}
          maxPartySize={this.props.maxPartySize}
          services={this.props.services}
          onSubmit={this.handleSubmit}
          selectedDay={this.state.selectedDay}
          formValues={this.props.formValues}
          handlePeopleChange={this.handlePeopleChange}
          handleSittingChange={this.handleSittingChange}
          people={this.state.peopleValue}
          sitting={this.state.sittingValue}
          maxPartySizeModal={this.props.maxPartySizeModal}
          resetForm={this.state.resetForm}
        />
        <InfoSearchTimes
          handleTabSelect={this.handleTabSelect}
          availability={this.props.availability}
          tabIndex={this.state.tabIndex}
          handleTimeSlotClick={this.handleTimeSlotClick}
          unavailableText={this.props.unavailableText}
          timeSlot={this.props.timeSlot}
        />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    closedDates: state.calendar,
    daysInAdvance: state.restaurant.AcceptBookingsDaysInAdvance,
    minPartySize: state.restaurant.MinOnlinePartySize,
    maxPartySize: state.restaurant.MaxOnlinePartySize,
    services: state.restaurant.Services || [],
    Areas: state.restaurant.Areas,
    availability: state.availability,
    unavailableText: state.restaurant.NoAvailabilityText,
    booking: state.booking.Booking,
    bookingComplete: state.booking.complete,
    reservationDetails: state.form.reservationDetails,
    timeSlot: state.timeSlot.time
  };
};

export default withRouter(connect(mapStateToProps, {getAvailability, setTimeSlot, setPage})(ReservationDetails));
