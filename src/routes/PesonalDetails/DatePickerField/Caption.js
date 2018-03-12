import React, { Component } from 'react';
import Select from 'react-select';

class Caption extends Component {
	state = {
		selectedMonth: this.props.date.getMonth(),
		selectedYear: this.props.date.getFullYear()
	};

	handleChange = e => {
		const property = typeof e.label === 'string' ? 'selectedMonth' : 'selectedYear';

		this.setState({ [property]: e.value }, () =>
			this.props.onChange(new Date(this.state.selectedYear, this.state.selectedMonth))
		);
	};

	render() {
		const { months, years } = this.props;

		return (
			<div style={{ display: 'table-caption', textAlign: 'center' }}>
				<Select
					name="month"
					value={this.state.selectedMonth}
					onChange={this.handleChange}
					options={months.map((month, i) => ({ label: month, value: i }))}
					clearable={false}
				/>
				<Select
					name="year"
					value={this.state.selectedYear}
					onChange={this.handleChange}
					options={years.map(year => ({ label: year, value: year }))}
					clearable={false}
				/>
			</div>
		);
	}
}

export default Caption;
