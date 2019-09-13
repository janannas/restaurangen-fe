import * as React from "react";
import './BookingCalendar.css';
import Calendar from 'react-calendar';

const moment = require('moment');

interface ICalendarProps {
	handleDate(date: string): any;
}

interface ICalendarState {
	value: Date | Date[];
}

class BookingCalendar extends React.Component<ICalendarProps, ICalendarState> {
	constructor(props: ICalendarProps) {
		super(props);
		this.state = { value: new Date() }
	}

	componentDidMount() {
		let today = moment().format('YYYY-MM-DD')
		this.handleDate(today);
	}

	handleDate = (date: string) => {
		this.props.handleDate(date);
	}

	onChange = (value: Date | Date[]) => {
		this.setState({ value });
		this.handleDate(moment(value).format('YYYY-MM-DD'));
	};

	render() {
		const { value } = this.state;

		return (
			<div className="calendar">
				<Calendar
					onChange={this.onChange}
					value={value}
					minDate={moment().toDate()}
				/>
			</div>
		);
	}
}

export default BookingCalendar;