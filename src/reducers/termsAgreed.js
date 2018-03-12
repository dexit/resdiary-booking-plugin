import { SET_TERMS } from '../constants';

const termsAgreed = (state = false, { type, payload }) => {
	switch (type) {
		case SET_TERMS:
			return payload;
		default:
			return state;
	}
};

export default termsAgreed;
