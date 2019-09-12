import * as React from "react";
import './Booking.css';
import '../BaseCss/Base.css';
import ApiCalls from '../../utils/ApiCalls';
import { IBooking } from "../../interfaces/IBooking";
import { IBookingDetails } from "../../interfaces/IBookingDetails";
import { IBookedTable } from "../../interfaces/IBookedTable";

import BookingCalendar from '../BookingCalendar/BookingCalendar';
import AvailableTables from '../AvailableTables/AvailableTables';
import FormDetails from "../FormDetails/FormDetails";
import BookingConfirmation from "../BookingConfirmation/BookingConfirmation";

const moment = require('moment');

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
	bookingDetails: IBookingDetails;
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
			bookingDetails: {
				name: '',
				email: "",
				phone: ""
			},
			bookedTables: [],
			freeSeats: 0
		}
	}

	handleDetailSubmit = async (newDetails: IBookingDetails) => {
		await this.setState({
			bookingDetails: newDetails
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
		const { name, email, phone } = this.state.bookingDetails;
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

			new ApiCalls().createBooking(obj)
				.then((result: any) => {
					// TODO: remove
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
			dateTime: dateTimeObj,
		});

		//Getting number of tables from database
		let numberOfTables = this.state.config.tables;

		//Looping through booked bookings for specific sitting
		for (let i = 0; i < this.state.bookedTables.length; i++) {
			let formattedBookedTime = moment(this.state.bookedTables[i].sitting, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');
			//Checks if chosen time is the same as a booking
			if (time === formattedBookedTime) {
				//Checks how many tables are taken by rounding up to closest int
				numberOfTables -= Math.ceil(this.state.bookedTables[i].guests / 6);
			}
		}
		//Calculates free seats depending on number of free tables
		var seatsThisSitting = numberOfTables * 6;

		this.setState({
			freeSeats: seatsThisSitting
		});

		if(seatsThisSitting === 0 || seatsThisSitting < this.state.guests){
			this.setState({
				guests: 0
			});
		}
	}

	handleSeatsClick = (guests: number) => {
		this.setState({ guests: guests });
	}

	render() {
		const { bookingSuccessful, bookingDetails, dateTime } = this.state;
		const { GDPRMessage } = this.state.config;

		if (bookingSuccessful) {
			return <BookingConfirmation
				name={bookingDetails.name}
				date={dateTime.date}
				time={dateTime.time}
			/>;
		}

		// OBS! -If h2 is removed/changed update test.tsx too
		return (
			<main className="Booking container-fluid">
				<div className="row booking-heading">
					<h2 className="col-12">Place booking</h2>
				</div>
				<div className="booking-form container">
					<div className="row">
						<div className="col-12 col-md-6 col-lg-6">
							<BookingCalendar handleDate={this.changeDate} />
							<AvailableTables
								dateTime={this.state.dateTime}
								config={this.state.config}
								handleTimeClick={this.calculateFreeSeats}
								handleSeatsClick={this.handleSeatsClick}
								freeSeats={this.state.freeSeats}
								guests={this.state.guests}
							/>
						</div>
						<div className="col-12 col-md-6 col-lg-6">
							<FormDetails handleDetailSubmit={this.handleDetailSubmit} GDPRMessage={GDPRMessage} />
						</div>
					</div>
				</div>
			</main>
		);
	}
}

export default Booking;