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

export interface IAvailableTablesState {
	selectedSeats: number;
}

class AvailableTables extends React.Component<IAvailableTablesProp, IAvailableTablesState> { 
	constructor(props: any) {
		super(props);

		this.state = {
			selectedSeats: 0
		}
	}

	handleTimeClick = (time: string) => {
		this.props.handleTimeClick(time);
		this.setState({
			selectedSeats: 0
		})
	}
	
	handleSeatsClick = (event:any) => {
		let guests = event.target.value;
		this.setState({
			selectedSeats: event.target.value
		})
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
			numberOfGuests.push(
				<option value={this.state.selectedSeats} key={'guests_'+0}>{this.state.selectedSeats}</option>
				);
			for(let i = 0; i < this.props.freeSeats; i++){
				numberOfGuests.push(
					<option value={i+1} key={'guests_'+(i+1)}>{i+1}</option>
				);
			}
			selectNumberOfGuests = (
				<select 
					value={this.state.selectedSeats}
					placeholder='Number of guests'
					name='guests' onChange={(e) => this.handleSeatsClick(e)}>{ numberOfGuests }</select>
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