import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ReactGA from 'react-ga';

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
