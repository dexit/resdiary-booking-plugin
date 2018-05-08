import React, { Component } from 'react';
import { string } from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getClosedDates, getRestaurantSetup, getCustomerCodes } from '../actions';
import { connect } from 'react-redux';
import ResDiary from '../services/ResDiary';
import Header from '../components/Header';
import AnalyticsTracker from '../components/AnalyticsTracker';
import BookingOptions from '../routes/BookingOptions';
import ReservationDetails from '../routes/ReservationDetails';
import ConfirmReservation from '../routes/ConfirmReservation';
import PersonalDetails from '../routes/PesonalDetails';
import CardDetails from '../routes/CardDetails';
import ReservationConfirmed from '../routes/ReservationConfirmed';
import AmendBooking from '../routes/AmendBooking';
import YourReservation from '../routes/YourReservation/index';
import Footer from '../components/Footer';

const GA = window.__gaTracker || window.ga;

class ResDiaryBookingPlugin extends Component {
	static propTypes = {
		restaurant: string.isRequired
	};

	constructor(props) {
		super(props);
		const { restaurant, getClosedDates, getRestaurantSetup, getCustomerCodes } = props;
		ResDiary.setRestaurant(restaurant);
		getRestaurantSetup();
		getClosedDates();
		//@CustomerCodes - uncomment below
		// getCustomerCodes();
	}

	render() {
		return (
			<BrowserRouter>
				<div>
					{GA && <AnalyticsTracker ga={GA} />}
					<Header page={this.props.page} amendBooking={this.props.amendBooking} />
					<Switch>
						<Route exact path="/reservations" component={BookingOptions} />
						<Route
							path="/reservations/reservation-details"
							render={() => <ReservationDetails maxPartySizeModal={this.props.maxPartySizeModal} />}
						/>
						<Route path="/reservations/confirm-reservation" component={ConfirmReservation} />
						<Route path="/reservations/personal-details" component={PersonalDetails} />
						<Route path="/reservations/card-details" component={CardDetails} />
						<Route path="/reservations/reservation-confirmed" component={ReservationConfirmed} />
						<Route path="/reservations/amend-booking" component={AmendBooking} />
						<Route path="/reservations/your-reservation" component={YourReservation} />
					</Switch>
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = state => ({ page: state.page, amendBooking: state.booking.amending });

export default connect(mapStateToProps, { getClosedDates, getRestaurantSetup, getCustomerCodes })(
	ResDiaryBookingPlugin
);
