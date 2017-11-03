import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getBooking, setAmendBooking, setPage} from '../../actions';

class AmendBooking extends Component {

  componentWillMount() {
    this.props.setPage(2);
    this.props.setAmendBooking(true);
    scroll(0, 0);
  }


  componentWillReceiveProps(nextProps) {
    if (!Object.keys(this.props.booking).length && Object.keys(nextProps.booking).length) {
      this.props.history.push('/reservations/your-reservation');
    }
  }

  submitBookingRef = data => {
    if (!Object.keys(data).length) return;
    this.props.getBooking(data.bookingReference);
  };

  render() {
    return (
      <section id="submit-reference">
        <div>
          <p>To change your reservation, please enter your booking reference number which can be found in your
            confirmation email we sent you.
          </p>
          <form onSubmit={this.props.handleSubmit(this.submitBookingRef)}>
            <Field name="bookingReference" component="input" placeholder="Booking reference"/>
            <button id="amend-button" type="submit" disabled={this.props.pristine || this.props.submitting}>
              Submit
            </button>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    booking: state.booking.Booking,
  };
};

AmendBooking = withRouter(connect(mapStateToProps, {getBooking, setAmendBooking, setPage})(AmendBooking));

export default reduxForm({
  form: 'amendbooking',
  destroyOnUnmount: false,
})(AmendBooking)
