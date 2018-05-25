import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ReactGA from 'react-ga';

window.ga = window.__gaTracker;

if (window.ga) {
	const trackerId = document
		.querySelector('[data-cfasync]')
		.innerText.match(/'(.*?)'/)[0]
		.replace('ga-disable-', '');

	ReactGA.initialize(trackerId);
}

class Analytics extends Component {
	componentDidUpdate(prevProps) {
		if (
			this.props.location.pathname !== prevProps.location.pathname ||
			this.props.location.search !== prevProps.location.search
		) {
			this.sendPageChange(this.props.location.pathname, this.props.location.search);
		}
	}

	sendPageChange(pathname, search = '') {
		const page = pathname + search;
		ReactGA.set({ page });
		ReactGA.pageview(page);
	}

	render() {
		return null;
	}
}

const AnalyticsTracker = () => <Route component={Analytics} />;

export default AnalyticsTracker;
