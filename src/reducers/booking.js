import {
	CHANGE_DATE_CLICKED,
	CONFIRM_BOOKING_FULFILLED,
	CONFIRM_BOOKING_PENDING,
	CONFIRM_BOOKING_REJECTED,
	CREATE_BOOKING_FULFILLED,
	CREATE_BOOKING_PAYMENT_VALID,
	CREATE_BOOKING_PENDING,
	CREATE_BOOKING_REJECTED,
	CREATE_BOOKING_STRIPE_TOKEN_FULFILLED,
	CREATE_BOOKING_STRIPE_TOKEN_PENDING,
	CREATE_BOOKING_STRIPE_TOKEN_REJECTED,
	GET_BOOKING_FULFILLED,
	GET_BOOKING_PENDING,
	GET_BOOKING_REJECTED,
	SET_AMEND_BOOKING,
	UPDATE_BOOKING_FULFILLED,
	UPDATE_BOOKING_PENDING,
	UPDATE_BOOKING_REJECTED
} from '../constants';

const initialState = {
	pending: false,
	complete: false,
	amending: false,
	confirmingBooking: false,
	paymentValid: false,
	Booking: {},
	stripe: {},
	stripeKey: ''
};

const booking = (state = initialState, { type, payload }) => {
	switch (type) {
		case CREATE_BOOKING_PENDING:
			return { ...state, pending: true };
		case CREATE_BOOKING_FULFILLED:
			if (payload.StripePublishableKey) {
				return { ...state, pending: false, stripeKey: payload.StripePublishableKey };
			}
			return { ...state, pending: false, complete: true, ...payload };
		case CREATE_BOOKING_REJECTED:
			return { ...state, pending: false };
		case CREATE_BOOKING_PAYMENT_VALID:
			return { ...state, paymentValid: payload };
		case CREATE_BOOKING_STRIPE_TOKEN_PENDING:
			return { ...state, pending: true };
		case CREATE_BOOKING_STRIPE_TOKEN_FULFILLED:
			return { ...state, pending: false, stripe: payload };
		case CREATE_BOOKING_STRIPE_TOKEN_REJECTED:
			return { ...state, pending: false };
		case GET_BOOKING_PENDING:
			return { ...state, pending: true };
		case GET_BOOKING_FULFILLED:
			return { ...state, pending: false, Booking: payload };
		case GET_BOOKING_REJECTED:
			return { ...state, pending: false };
		case UPDATE_BOOKING_PENDING:
			return { ...state, pending: true };
		case UPDATE_BOOKING_FULFILLED:
			if (payload.Status === 'CreditCardRequired') {
				return { ...state, pending: false, stripeKey: payload.StripePublishableKey, confirmingBooking: true };
			}
			return { ...state, pending: false, complete: true, ...payload };
		case UPDATE_BOOKING_REJECTED:
			return { ...state, pending: false };
		case CONFIRM_BOOKING_PENDING:
			return { ...state, pending: true };
		case CONFIRM_BOOKING_FULFILLED:
			return { ...state, pending: false, complete: true, confirmingBooking: false, ...payload };
		case CONFIRM_BOOKING_REJECTED:
			return { ...state, pending: false, confirmingBooking: false };
		case CHANGE_DATE_CLICKED:
			return { ...state, pending: false, confirmingBooking: false, stripeKey: '' };
		case SET_AMEND_BOOKING:
			if (!payload) {
				return { ...state, Booking: {}, amending: payload };
			}
			return { ...state, complete: false, amending: payload };
		default:
			return state;
	}
};

export default booking;
