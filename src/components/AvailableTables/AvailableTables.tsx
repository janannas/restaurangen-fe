import * as React from "react";
import './AvailableTables.css';

interface IAvailableTablesProps {
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

const AvailableTables = (props: IAvailableTablesProps) => {
	const handleTimeClick = async (time: string) => {
		props.handleTimeClick(time);
	}

	const handleSeatsClick = async (event: any) => {
		event.preventDefault();
		let guests = event.target.value;
		props.handleSeatsClick(guests);
	}

	var classNames = require('classnames');
	var displaySittings = [];
	var numberOfGuests = [];
	var selectNumberOfGuests;

	// Adding the sittings into an array in order to loop through them
	let sittingList = [props.config.sittingOne, props.config.sittingTwo];

	// Checking if there are any free seats for selected time and date
	if (props.freeSeats === 0) {
		selectNumberOfGuests = (
			<p>No free seats</p>
		);
	}
	else {
		numberOfGuests.push(
			<option value='0' key={'guests_' + 0}>0</option>
		);
		for (let i = 0; i < props.freeSeats; i++) {
			numberOfGuests.push(
				<option value={i + 1} key={'guests_' + (i + 1)}>{i + 1}</option>
			);
		}
		selectNumberOfGuests = (
			<select
				value={props.guests}
				name='guests' onChange={(e) => handleSeatsClick(e)}>{numberOfGuests}</select>
		);
	}

	// Looping through sittings and change div visability depending on selected time
	for (let i = 0; i < sittingList.length; i++) {
		var selectWrap = classNames({
			'number_of_guests': true,
			'show': props.dateTime.time === sittingList[i],
			'hide': props.dateTime.time !== sittingList[i]
		});

		// Pushing looped sittings with HTML into an array
		displaySittings.push((
			<div key={'sitting_' + (i + 1)} className="sitting_wrap" onClick={() => handleTimeClick(sittingList[i])}>
				<h4>{sittingList[i]}</h4>
				<div className={selectWrap}>
					{selectNumberOfGuests}
				</div>
			</div>
		));
	}

	return (
		<div>
			<h3>{props.dateTime.date}</h3>
			{displaySittings}
		</div>
	);
}

export default AvailableTables;