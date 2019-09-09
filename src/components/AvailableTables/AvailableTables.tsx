import * as React from "react"; 
import './AvailableTables.css';

export interface IAvailableTablesProp {
	dateTime: {
		date: string;
		time: string;
	}
	config: {
		sittingOne: string;
		sittingTwo: string;
	}
	freeSeats: number;
	handleTimeClick(time: string): any;
	handleSeatsClick(guests: number): any;
}

class AvailableTables extends React.Component<IAvailableTablesProp, {}> { 
	constructor(props: any) {
		super(props);
	}

	handleTimeClick = (time: string) => {
		this.props.handleTimeClick(time);
	}
	
	handleSeatsClick = (event:any) => {
		let guests = event.target.value;
		this.props.handleSeatsClick(guests);
	}

	public render() {
		var classNames = require('classnames');
		var displaySittings = [];
		var numberOfGuests = [];
		var selectNumberOfGuests;

		// Adding the sittings into an array in order to loop through them
		let sittingList = [this.props.config.sittingOne, this.props.config.sittingTwo];

		// Checking if there are any free seats for selected time and date
		if(this.props.freeSeats === 0) {
			selectNumberOfGuests = (
				<p>No free seats</p>
			);
		}
		else {
			for(let i = 0; i < this.props.freeSeats; i++){
				numberOfGuests.push(
					<option value={i+1} key={'guests_'+(i+1)}>{i+1}</option>
				);
			}
			selectNumberOfGuests = (
				<select name='guests' onChange={(e) => this.handleSeatsClick(e)}>{ numberOfGuests }</select>
			);
		}

		// Looping through sittings and change div visability depending on selected time
		for(let i = 0; i < sittingList.length; i++) {
			var selectWrap = classNames({
				'number_of_guests': true,
				'show': this.props.dateTime.time === sittingList[i],
				'hide': this.props.dateTime.time !== sittingList[i]
			});

			// Pushing looped sittings with HTML into an array
			displaySittings.push((
				<div key={'sitting_'+(i+1)} className="sitting_wrap" onClick={() => this.handleTimeClick(sittingList[i])}>
					<h4>{sittingList[i]}</h4>
					<div className={selectWrap}>
							{selectNumberOfGuests}
					</div>
				</div>
			));
		}
	
		return (
			<div>
				<h3>{this.props.dateTime.date}</h3>
				{displaySittings}
			</div>
		); 
	}
}

export default AvailableTables;