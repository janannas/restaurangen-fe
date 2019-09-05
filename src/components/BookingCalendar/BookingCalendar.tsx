import * as React from "react"; 
import './BookingCalendar.css';
import Calendar from 'react-calendar';

const moment = require('moment');

export interface ICalendarProp {
	handleDate(date:string):any;
}

export interface ICalendarState {
	value: Date | Date[];
}

class BookingCalendar extends React.Component<ICalendarProp, ICalendarState> { 
	constructor(props: any) {
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

	public render() {
		const { value } = this.state;

		return (
			<div className = "calendar">
				<Calendar onChange = 
					{this.onChange}
					showWeekNumbers
					value={value}
				/>
			</div>
		); 
	}
}

export default BookingCalendar;