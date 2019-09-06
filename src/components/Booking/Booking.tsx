import * as React from "react";
import ApiCalls from '../../utils/ApiCalls';
import BookingCalendar from '../BookingCalendar/BookingCalendar';
import AvailableTables from '../AvailableTables/AvailableTables';

import { IBooking } from "../../interfaces/IBooking";

import { FormDetails } from "../FormDetails/FormDetails";
import { triggerAsyncId } from "async_hooks";

const moment = require('moment');

export interface IDetails {
	name: string;
	email: string;
	phone: string;
}

export interface IBookedTable {
	guests: number;
	sitting: string;
}

interface IBookingState {
	bookingSuccessful: boolean;
	dateTime: {
		date: string;
		time: string;
	}
	guests: number;
	config: {
		tables: number;
		sittingOne: string;
		sittingTwo: string;
		GDPRMessage: string;
	}
	details: IDetails;
	bookedTables: IBookedTable[];

	freeSeats: number;
}

class Booking extends React.Component<{}, IBookingState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			bookingSuccessful: false,
			dateTime: {
				date: "",
				time: ""
			},
			guests: 0,
			config: {
				tables: 0,
				sittingOne: "",
				sittingTwo: "",
				GDPRMessage: "",
			},
			details: {
				name: '',
				email: "",
				phone: ""
			},
			bookedTables: [],
			freeSeats: 0
		}
	}

	handleDetailSubmit = async (newDetails: IDetails) => {
		await this.setState({
			details: newDetails
		});

		this.prepareBooking();
	}

	componentDidMount() {
		new ApiCalls().fetchConfig()
			.then((result: any) => {
				const data = result.data;

				let configObj = data.reduce((acc: any, obj: any) => {

					return { ...acc, [obj.key]: obj["value"] }
				}, {});

				let tempObj = { ...this.state.config };

				tempObj.tables = configObj.tables;
				tempObj.sittingOne = configObj.sitting_one;
				tempObj.sittingTwo = configObj.sitting_two;
				tempObj.GDPRMessage = configObj.GDPR;

				this.setState({
					config: tempObj
				})
			})
			.catch(error => {
				console.log(error);
			})
	}

	bookingObj = (): IBooking => {
		const { name, email, phone } = this.state.details;
		let dateTime = this.state.dateTime.date + " " + this.state.dateTime.time;

		return {
			name: name,
			email: email,
			phone: phone,
			guests: this.state.guests,
			sitting: dateTime
		};
	}

	prepareBooking = (): void => {
		if (this.state.guests !== 0) {
			const obj = this.bookingObj();

			// TODO: remove
			console.log(obj);

			new ApiCalls().createBooking(obj)
				.then((result: any) => {
					console.log(result.data);

					this.setState({ bookingSuccessful: true });
				})
				.catch(error => {
					console.log(error);
				})
		}
		else {
			alert('Please choose number of guests');
		}
	}

	changeDate = (date: string) => {
		var dateTimeObj = {
			date: date,
			time: '00:00'
		}

		this.setState({
			dateTime: dateTimeObj,
			guests: 0
		});

		new ApiCalls().fetchBookedTables(date)
			.then((result: any) => {
				const data = result.data;
				const isArr = Array.isArray(result.data);

				if (data === "") {
					this.setState({
						bookedTables: []
					});
				}
				else if (isArr) {
					this.setState({
						bookedTables: data
					});
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	calculateFreeSeats = (time: string) => {
		var dateTimeObj = {
			date: this.state.dateTime.date,
			time: time
		}

		this.setState({
			dateTime: dateTimeObj
		});

		let numberOfTables = this.state.config.tables;

		for (let i = 0; i < this.state.bookedTables.length; i++) {
			let formattedBookedTime = moment(this.state.bookedTables[i].sitting, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');
			if (time === formattedBookedTime) {
				numberOfTables -= Math.ceil(this.state.bookedTables[i].guests / 6);
			}
		}
		var seatsThisSitting = numberOfTables * 6;

		this.setState({
			freeSeats: seatsThisSitting
		});
	}

	handleSeatsClick = (guests: number) => {
		this.setState({ guests: guests });
	}

	render() {
		const { bookingSuccessful } = this.state;
		const { GDPRMessage } = this.state.config;

		if (bookingSuccessful) {
			// FIXME: add modal here
			return <h1>Thanks for booking</h1>
		}
		return (
			<div className="Booking">
				<h1>Booking works</h1>
				<BookingCalendar handleDate={this.changeDate} />
				<AvailableTables
					dateTime={this.state.dateTime}
					config={this.state.config}
					handleTimeClick={this.calculateFreeSeats}
					handleSeatsClick={this.handleSeatsClick}
					freeSeats={this.state.freeSeats}
				/>
				<FormDetails handleDetailSubmit={this.handleDetailSubmit} GDPRMessage={GDPRMessage} />
			</div>
		);
	}
}

export default Booking;