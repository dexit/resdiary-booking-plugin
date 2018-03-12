import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	reInitForm,
	resetAvailability,
	resetForm,
	resetInitialFormState,
	resetTimeSlot,
	setAmendBooking,
	setPage
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

	render() {
		return (
			<section id="make-reservation">
				<div>
					<p>I would like to:</p>
					<ul>
						<li>
							<Link to="/reservations/reservation-details">Make a new reservation</Link>
						</li>
						<li>
							<Link to="/reservations/amend-booking">Manage my existing reservation</Link>
						</li>
					</ul>
				</div>
			</section>
		);
	}
}

export default connect(state => ({ initialFormState: state.inititalFormState }), {
	setPage,
	setAmendBooking,
	resetInitialFormState,
	reInitForm,
	resetForm,
	resetAvailability,
	resetTimeSlot
})(BookingOptions);
