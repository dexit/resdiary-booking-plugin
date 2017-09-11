import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAvailability} from '../../actions';
import moment from 'moment';
import Calendar from './Calendar';

class ReservationDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {selectedDay: null, peopleValue: null, sittingValue: null};
  }

  handleDayClick = (day, {selected, disabled}) => {
    if (disabled) return;

    this.setState({selectedDay: day});
  };

  disabledDays = () => {
    if (this.props.daysInAdvance) {
      return [...this.props.closedDates,
        {after: moment().add(this.props.daysInAdvance, 'days').toDate()},
        {before: new Date()}
      ];
    }
    return [...this.props.closedDates, {before: new Date()}];
  };

  handleSubmit = () => {
    const data = {
      VisitDate: this.state.selectedDay,
      PartySize: parseInt(this.state.peopleValue)
    };
    this.props.getAvailability(data);
  };

  handlePeopleChange = (e) => {
    this.setState({peopleValue: e.currentTarget.value});
  };

  handleSittingChange = (e) => {
    this.setState({sittingValue: e.currentTarget.value});
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
    services: state.restaurant.Services || []
  };
};

export default connect(mapStateToProps, {getAvailability})(ReservationDetails);

{/*<div>*/}
{/*<nav>*/}
{/*<button type="button">Useful Info</button>*/}
{/*<button type="button" disabled>Available Times</button>*/}
{/*</nav>*/}
{/*<div id="info">*/}
{/*<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et*/}
{/*dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip*/}
{/*ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu*/}
{/*fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia*/}
{/*deserunt mollit anim id est laborum.</p>*/}
{/*</div>*/}
{/*<dl id="available-times">*/}
{/*<dt>Area name</dt>*/}
{/*<dd>*/}
{/*<button type="button">9:00PM</button>*/}
{/*<button type="button">9:00PM</button>*/}
{/*<button type="button">9:00PM</button>*/}
{/*</dd>*/}
{/*<dt>Area name</dt>*/}
{/*<dd>*/}
{/*<button type="button">9:00PM</button>*/}
{/*<button type="button">9:00PM</button>*/}
{/*<button type="button">9:00PM</button>*/}
{/*</dd>*/}
{/*</dl>*/}
{/*</div>*/}
