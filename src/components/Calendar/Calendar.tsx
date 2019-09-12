import * as React from "react";
import './BookingCalendar.css';
import * as moment from 'moment';
import Calendar from 'react-calendar';

export interface ICalendarProps {
	handleDate(date: string): any;
}

export interface ICalendarState {
	value: Date | Date[];
}

class BookingCalendar extends React.Component<ICalendarProps, ICalendarState> {
	constructor(props: ICalendarProps) {
		super(props);

		this.state = { value: new Date() }
	}

	handleDate = (date: string) => {
		this.props.handleDate(date);
	}

	onChange = (value: Date | Date[]) => {
		this.setState({ value });

		const moment = require('moment');
		this.handleDate(moment(value).format('YYYY-MM-DD'));
	};

	public render() {
		const { value } = this.state;

		return (
			<div className="calendar">
				<Calendar onChange=
					{this.onChange}
					showWeekNumbers
					value={value}
				/>
			</div>
		);
	}
}

export default BookingCalendar;