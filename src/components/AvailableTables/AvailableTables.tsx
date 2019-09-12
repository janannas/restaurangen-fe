import * as React from "react"; 

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
	guests: number;
	handleTimeClick(time: string): any;
	handleSeatsClick(guests: number): any;
}

class AvailableTables extends React.Component<IAvailableTablesProp, {}> { 
	constructor(props: any) {
		super(props);
	}

	handleTimeClick = async (time: string) => {
		this.props.handleTimeClick(time);
	}
	
	handleSeatsClick = async (event:any) => {
		event.preventDefault();
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
			numberOfGuests.push(
				<option value='0' key={'guests_'+0}>0</option>
				);
			for(let i = 0; i < this.props.freeSeats; i++){
				numberOfGuests.push(
					<option value={i+1} key={'guests_'+(i+1)}>{i+1}</option>
				);
			}
			selectNumberOfGuests = (
				<select 
					value={this.props.guests}
					name='guests' onChange={(e) => this.handleSeatsClick(e)}>{ numberOfGuests }</select>
			);
		}

		// Looping through sittings and change div visability depending on selected time
		for(let i = 0; i < sittingList.length; i++) {
			let selectWrap = classNames({
				'number-of-guests': true,
				'show': this.props.dateTime.time === sittingList[i],
				'hide': this.props.dateTime.time !== sittingList[i]
			});

			let sittingBlock = classNames({
				'sitting-block': true, 
				'align-middle': true, 
				'col-6': true,
				'show': this.props.dateTime.time === sittingList[i],
				'hide': this.props.dateTime.time !== sittingList[i]
			});

			// Pushing looped sittings with HTML into an array
			displaySittings.push((
				<div key={'sitting_'+(i+1)} className={sittingBlock} onClick={() => this.handleTimeClick(sittingList[i])}>
					<h4 className="sitting-time">{sittingList[i]}</h4>
					<div className={selectWrap}>
							{selectNumberOfGuests}
					</div>
				</div>
			));
		}
	
		return (
			<div className="row justify-content-around">
				<h3 className="col-sm-12 displayed-date">{this.props.dateTime.date}</h3>
				<div className="sitting-wrap col-12 row justify-content-between">
					{displaySittings}
				</div>
			</div>
		); 
	}
}

export default AvailableTables;