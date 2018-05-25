import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	reInitForm,
	resetAvailability,
	resetForm,
	resetInitialFormState,
	resetTimeSlot,
	setAmendBooking,
	setPage,
	setMarketingOptIn
} from '../../actions';
import { connect } from 'react-redux';

class BookingOptions extends Component {
	componentWillMount() {
		this.props.setPage(0);
		this.props.setAmendBooking(false);
		this.props.resetInitialFormState();
		this.props.resetAvailability();
		this.props.resetTimeSlot();
		this.props.reInitForm('reservationDetails', this.props.initialFormState);
		this.props.resetForm('reservationDetails');
		scroll(0, 0);
	}

	handleChange = e => {
		this.props.setMarketingOptIn(e.target.checked);
	};

	render() {
		return (
			<section id="make-reservation">
				<div>
					<p>I would like to:</p>
					<ul>
						<li className={!this.props.marketingOptIn ? 'disabled' : ''}>
							<Link to="/reservations/reservation-details">Make a new reservation</Link>
						</li>
						<li>
							<Link to="/reservations/amend-booking">Manage my existing reservation</Link>
						</li>
					</ul>
				</div>
				<div id="marketing-opt-in">
					<h1>Important Information</h1>
					<label>
						<div>
							<input
								type="checkbox"
								name="marketingOptIn"
								value="yes"
								onChange={this.handleChange}
								checked={this.props.marketingOptIn}
							/>
						</div>
						<span>
							PLEASE TICK ME! We ask that you tick this box so that we are able to use your details to proceed with your
							reservation & contact you with information surrounding it & our venues. We do not bombard our customers
							with emails, it is simply used to confirm your booking and infrequently share info about our venues.
						</span>
					</label>
				</div>
			</section>
		);
	}
}

export default connect(
	state => ({
		initialFormState: state.inititalFormState,
		marketingOptIn: state.marketingOptIn
	}),
	{
		setPage,
		setAmendBooking,
		setMarketingOptIn,
		resetInitialFormState,
		reInitForm,
		resetForm,
		resetAvailability,
		resetTimeSlot
	}
)(BookingOptions);
