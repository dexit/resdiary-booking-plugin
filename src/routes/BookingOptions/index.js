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
						<li>
							<Link to="/reservations/reservation-details">Make a new reservation</Link>
						</li>
						<li>
							<Link to="/reservations/amend-booking">Manage my existing reservation</Link>
						</li>
					</ul>
				</div>
				<div id="marketing-opt-in">
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
							By ticking this box I am happy for my details to be used to receive further information about my booking
							and about Incipio venues. We do not share any data with third parties and are compliant with all new data
							protection laws.
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
