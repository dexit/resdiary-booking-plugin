import { SET_MARKETING_OPT_IN } from '../constants';

const marketingOptIn = (state = false, { type, payload }) => {
	switch (type) {
		case SET_MARKETING_OPT_IN:
			return payload;
		default:
			return state;
	}
};

export default marketingOptIn;
