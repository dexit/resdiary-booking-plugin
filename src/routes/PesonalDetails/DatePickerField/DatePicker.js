import React, { Component } from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate } from 'react-day-picker/moment';
import Caption from './Caption';

const fromMonth = moment()
	.subtract(100, 'years')
	.toDate();
const toMonth = moment()
	.subtract(18, 'years')
	.toDate();

const months = moment.months();
const years = [];

for (let i = toMonth.getFullYear(); i >= fromMonth.getFullYear(); i -= 1) {
	years.push(i);
}

class DatePicker extends Component {
	state = {
		month: toMonth
	};

	handleYearMonthChange = month => {
		this.setState({ month });
	};

	render() {
		const { input, placeholder } = this.props;

		return (
			<DayPickerInput
				{...input}
				formatDate={formatDate}
				format={'DD/MM/YYYY'}
				placeholder={placeholder}
				onDayChange={day => {
					input.onChange(day);
					input.onBlur(day);
				}}
				dayPickerProps={{
					month: this.state.month,
					captionElement: ({ date }) => (
						<Caption date={date} onChange={this.handleYearMonthChange} months={months} years={years} />
					)
				}}
				keepFocus={false}
			/>
		);
	}
}

export default DatePicker;
