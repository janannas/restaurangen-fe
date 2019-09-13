import * as React from "react";

export interface IAvailableTablesProps {
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
	const {
		config,
		freeSeats,
		guests,
		dateTime
	} = props;

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
	let sittingList = [config.sittingOne, config.sittingTwo];

	// Checking if there are any free seats for selected time and date
	if (freeSeats === 0) {
		selectNumberOfGuests = (
			<p>No free seats</p>
		);
	}
	else {
		numberOfGuests.push(
			<option value='0' key={'guests_' + 0}>0</option>
		);
		for (let i = 0; i < freeSeats; i++) {
			numberOfGuests.push(
				<option
					value={i + 1}
					key={'guests_' + (i + 1)}
				>
					{i + 1}
				</option>
			);
		}
		selectNumberOfGuests = (
			<select
				value={guests}
				name='guests' onChange={(e) => handleSeatsClick(e)}
			>
				{numberOfGuests}
			</select>
		);
	}

	// Looping through sittings and change div visability depending on selected time
	for (let i = 0; i < sittingList.length; i++) {
		let selectWrap = classNames({
			'number-of-guests': true,
			'show': dateTime.time === sittingList[i],
			'hide': dateTime.time !== sittingList[i]
		});

		let sittingBlock = classNames({
			'sitting-block': true,
			'align-middle': true,
			'col-6': true,
			'show': dateTime.time === sittingList[i],
			'hide': dateTime.time !== sittingList[i]
		});

		// Pushing looped sittings with HTML into an array
		displaySittings.push((
			<div
				key={'sitting_' + (i + 1)}
				className={sittingBlock}
				onClick={() => handleTimeClick(sittingList[i])}
			>
				<h4 className="sitting-time">{sittingList[i]}</h4>
				<div className={selectWrap}>
					{selectNumberOfGuests}
				</div>
			</div>
		));
	}

	return (
		<div className="row justify-content-around">
			<h3 className="col-sm-12 displayed-date">{dateTime.date}</h3>
			<div className="sitting-wrap col-12 row justify-content-between">
				{displaySittings}
			</div>
		</div>
	);
}

export default AvailableTables;