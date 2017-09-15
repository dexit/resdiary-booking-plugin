import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import StripeForm from './StripeForm';
import {connect} from 'react-redux';
import {createBooking, getStripeToken, paymentDetailsVaild} from '../../actions';

class CardDetails extends Component {

  componentWillReceiveProps(nextProps) {
    // if (!this.props.booking.complete && nextProps.booking.complete) {
    //   this.props.history.push('/reservations/reservation-confirmed');
    // }

    if (!Object.keys(this.props.booking.stripe).length && Object.keys(nextProps.booking.stripe).length) {
      const data = {
        ...this.props.reservationDetails,
        ...this.props.personalDetails,
        timeSlot: this.props.timeSlot,
        stripeToken: nextProps.stripeToken
      };
      this.props.createBooking(data);
    }
  }

//pk_test_OKWxyW0ySXJeBE3XQW8r0TN9
  render() {
    return (
      <StripeProvider apiKey="pk_test_PBhW0eCN4VmbnK3mW7TmoNRs">
        <Elements>
          <StripeForm
            paymentDetailsVaild={this.props.paymentDetailsVaild}
            getStripeToken={this.props.getStripeToken}
          />
        </Elements>
      </StripeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    booking: state.booking,
    timeSlot: state.timeSlot,
    personalDetails: state.form.personalDetails.values,
    reservationDetails: state.form.reservationDetails.values,
    stripeToken: state.booking.stripe.id
  };
};

export default connect(mapStateToProps, {paymentDetailsVaild, getStripeToken, createBooking})(CardDetails);