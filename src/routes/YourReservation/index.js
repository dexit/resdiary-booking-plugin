import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {setInitialFormState, setPage} from '../../actions';

class YourReservation extends Component {

  componentWillMount() {
    this.props.setPage(3);
    this.props.setInitialFormState({people: this.props.booking.PartySize});
  }


  render() {
    const {customer, booking} = this.props;

    return (
      <section id="amend-reservation">
        <div>
          <p>Hi {customer.FirstName}!</p>
          <dl id="booking-reference">
            <dt>Booking Reference Number</dt>
            <dd>{booking.Reference}</dd>
          </dl>
          <p>If you would like to change your reservation details please do so by clicking on the edit options
            below.</p>
          <dl id="booking-details">
            <dt>Date</dt>
            <dd><span>{moment(booking.VisitDate).format('dddd Do MMMM YYYY')}</span>
              <Link to='/reservations/reservation-details'>edit</Link>
            </dd>
            {/*<dt>Sitting</dt>*/}
            {/*<dd><span>Evening</span>*/}
            {/*<button type="button">edit</button>*/}
            {/*</dd>*/}
            <dt>No. of people</dt>
            <dd><span>{booking.PartySize}</span>
              <Link to='/reservations/reservation-details'>edit</Link>
            </dd>
            <dt>Time</dt>
            <dd><span>{booking.VisitTime.slice(0, -3).replace(':', '.')}hrs</span>
              <Link to='/reservations/reservation-details'>edit</Link>
            </dd>
          </dl>
        </div>
      </section>
    );
  }
};

const mapStateToProps = state => {
  return {
    customer: state.booking.Booking.Customer,
    booking: state.booking.Booking
  };
};


export default connect(mapStateToProps, {setInitialFormState, setPage})(YourReservation);
