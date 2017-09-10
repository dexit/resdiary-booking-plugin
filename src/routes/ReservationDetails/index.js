import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import Calendar from './Calendar';

class ReservationDetails extends Component {

  constructor(props) {
    super(props);
  }

  handleDayClick = (e, w, r) => {
    console.log('e,w,r', e, w, r);
  };

  disabledDays = () => {

    if (this.props.daysInAdvance) {
      return [...this.props.closedDates, {after: moment().add(this.props.daysInAdvance, 'days').toDate()}]
    }
    return this.props.closedDates
  };

  render() {
    return (
      <section id="reservation-details">
        <Calendar
          handleDayClick={this.handleDayClick}
          disabledDays={this.disabledDays()}
          toMonth={moment().add(this.props.daysInAdvance, 'days').toDate()}
        />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    closedDates: state.calendar,
    daysInAdvance: state.restaurant.AcceptBookingsDaysInAdvance
  }
};

export default connect(mapStateToProps, null)(ReservationDetails);

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
