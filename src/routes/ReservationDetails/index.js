import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAvailability, setTimeSlot} from '../../actions';
import moment from 'moment';
import Calendar from './Calendar';
import InfoSearchTimes from './InfoSearchTimes';

class ReservationDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDay: null,
      peopleValue: null,
      sittingValue: null,
      tabIndex: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.availability.length) {
      this.setState({tabIndex: 1})
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
    this.props.setTimeSlot({time: ''});
    this.props.getAvailability(data);
  };

  handlePeopleChange = e => {
    this.setState({peopleValue: e.currentTarget.value});
  };

  handleSittingChange = e => {
    this.setState({sittingValue: e.currentTarget.value});
  };

  handleTabSelect = tabIndex => this.setState({tabIndex});

  handleTimeSlotClick = e => {
    this.props.setTimeSlot(JSON.parse(e.currentTarget.value));
  };

  render() {
    return (
      <section id="reservation-details">
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
        />
        <InfoSearchTimes
          handleTabSelect={this.handleTabSelect}
          availability={this.props.availability}
          tabIndex={this.state.tabIndex}
          handleTimeSlotClick={this.handleTimeSlotClick}
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
  };
};

export default connect(mapStateToProps, {getAvailability, setTimeSlot})(ReservationDetails);
