import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeForm from './StripeForm';
import { connect } from 'react-redux';
import { confirmBooking, createBooking, getStripeToken, paymentDetailsValid, setPage } from '../../actions';

class CardDetails extends Component {
	componentWillMount() {
		this.props.setPage(4);
		scroll(0, 0);
	}

	componentWillReceiveProps(nextProps) {
		if (!Object.keys(this.props.stripe).length && Object.keys(nextProps.stripe).length) {
			if (this.props.bookingAmending) {
				this.props.confirmBooking({
					stripeToken: nextProps.stripe.id,
					bookingRef: this.props.booking.Booking.Reference
				});
			} else {
				const data = {
					...this.props.reservationDetails.values,
					...this.props.personalDetails.values,
					timeSlot: this.props.timeSlot,
					stripeToken: nextProps.stripe.id
				};

				this.props.createBooking(data);
			}
		}

		if (nextProps.bookingComplete) {
			this.props.history.push('/reservations/reservation-confirmed');
		}
	}

	render() {
		return (
			<StripeProvider apiKey={this.props.stripeKey}>
				<Elements>
					<StripeForm
						paymentDetailsValid={this.props.paymentDetailsValid}
						getStripeToken={this.props.getStripeToken}
						stripeKey={this.props.stripeKey}
						paymentValid={this.props.paymentValid}
					/>
				</Elements>
			</StripeProvider>
		);
	}
}

const mapStateToProps = state => {
	return {
		stripeKey: state.booking.stripeKey,
		personalDetails: state.form.personalDetails,
		reservationDetails: state.form.reservationDetails,
		timeSlot: state.timeSlot,
		stripe: state.booking.stripe,
		bookingComplete: state.booking.complete,
		paymentValid: state.booking.paymentValid,
		bookingAmending: state.booking.amending,
		booking: state.booking
	};
};

export default connect(mapStateToProps, {
	paymentDetailsValid,
	getStripeToken,
	createBooking,
	setPage,
	confirmBooking
})(CardDetails);
