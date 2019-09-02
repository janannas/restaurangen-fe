import * as React from "react"; 
import './Calendar.css';
import * as moment from 'moment';

export interface ICalendarProp {
	handleDateClick(date:string):any;
}

export interface ICalendarState {
	date: string;
}

class Calendar extends React.Component<ICalendarProp, ICalendarState> { 
	constructor(props: any) {
		super(props);

	}

	handleDateClick = (date: string) => {
		this.props.handleDateClick(date);
	}

	public render() {

		var moment = require('moment');
		// var date = moment().format('YYYY MM DD, hh:mm');
		var month = moment().format('MMMM');

		var year = moment().format('YYYY');
		var date = moment(month+''+year, 'MMMMYYYY').format('YYYY-MM');
		console.log(date);
		const weekStart = moment().startOf('week'+1).format('dd');
		const monthStart = moment().startOf('month').format('dd');
		var lengthOfMonth = moment(month, 'MMMM YYYY').daysInMonth();
		var weekStartNum: number;
		var monthStartNum: number;

		
		// if(){

		// }else if(){

		// }
		console.log(weekStart);
		console.log(moment(month, 'MMMM YYYY').daysInMonth());
		console.log(moment(weekStart, "dd").fromNow());
		console.log(moment().format('dddd')  === 'Monday');
		
		
		console.log(moment("Mo", "dd").fromNow());
		console.log(moment().day());

		const weekdays = [
			'Mo', 
			'Tu', 
			'We', 
			'Th', 
			'Fr', 
			'Sa', 
			'Su'
		];

		const top = [];

		for (let i = 0; i < weekdays.length; i++){
			top.push(
				<li key={'weekdays'+i}>{weekdays[i]}</li>
			);
		}
		
		var dates = [];

		for (let i = 1; i <= lengthOfMonth; i++){
			dates.push(
				<li key={'dates'+i} onClick={() => this.handleDateClick(date+'-'+i)}>{i}</li>
			);
		}

		return (
			<div className="calendar">

				<div className="month">      
					<ul>
						<li className="prev">&#10094;</li>
						<li className="next">&#10095;</li>
						<li>
							{month}<br />
							<span>{year}</span>
						</li>
					</ul>
				</div>
				<ul className="weekdays">{top}</ul>
				<div className="days">{dates}</div>
			</div>

		); 
	}
}

export default Calendar;