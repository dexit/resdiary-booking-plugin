import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { object } from 'prop-types';

class Analytics extends Component {
	static propTypes = {
		ga: object.isRequired
	};

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
		this.props.ga.set({ page });
		this.props.ga.pageview(page);
	}

	render() {
		return null;
	}
}

const AnalyticsTracker = () => <Route component={Analytics} />;

export default AnalyticsTracker;
