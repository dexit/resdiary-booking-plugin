import { PAGE_NUMBER } from '../constants';

const page = (state = 0, { type, payload }) => {
	switch (type) {
		case PAGE_NUMBER:
			return payload;
		default:
			return state;
	}
};

export default page;
