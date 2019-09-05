
import * as React from "react"; 
import ApiCalls from '../../utils/ApiCalls';
import BookingCalendar from '../BookingCalendar/BookingCalendar';
import AvailableTables from '../AvailableTables/AvailableTables';

import { IBooking } from "../../interfaces/IBooking";

import { DetailsForm } from "../DetailsForm/DetailsForm";
import { GDPR } from "../GDPR/GDPR";

const moment = require('moment');

export interface IDetails {
	name: string;
}


export interface IBookedTable {
	guests: number;
	sitting: string;
}

interface IBookingState {
	date: string;
	config: {
		tables: number;
		sittingOne: string;
		sittingTwo: string;
		GDPRMessage: string;
	}
	details: IDetails;
	bookedTables: IBookedTable[];
}

class Booking extends React.Component<{}, IBookingState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			date: "",
			config: {
				tables: 0,
				sittingOne: "",
				sittingTwo: "",
				GDPRMessage: "",
			},
			details: {
				name: ''
			},
			bookedTables: []
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(newDetails: IDetails) {
		console.log("Setting state in Booking: ", newDetails);
		this.setState({
			details: newDetails
		});
	}

	componentDidMount() {
		new ApiCalls().fetchConfig()
			.then((result: any) => {
				const data = result.data;

				let configObj = data.reduce((acc: any, obj: any) => {

					return { ...acc, [obj.key]: obj["value"]}
				}, {});

				console.log(configObj);

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
		return {
			name: "Johan",
			email: "johan@gmail.com",
			phone: "0123456789",
			guests: "7",
			sitting: "2013-08-30 19:05:00"
		};
	}

	prepareBooking = (): void => {
		const obj = this.bookingObj();

		new ApiCalls().createBooking(obj)
			.then((result: any) => {
				console.log(result.data);
			})
			.catch(error => {
				console.log(error);
			})
	}

	changeDate = (date: string) => {		
		this.setState({ date: date });
		new ApiCalls().fetchBookedTables(date)
		.then((result: any) => {
			const data = result.data;
			const isArr = Array.isArray(result.data);

			if(data === ""){
				this.setState({
					bookedTables: []
				});
			}
			else if(isArr) {
				this.setState({
					bookedTables: data
				});
			}
			this.calculateFreeSeats();
		})
		.catch(error => {
			console.log(error);
		});
	}

	calculateFreeSeats = () => {	
		let tablesSittingOne = this.state.config.tables;
		let tablesSittingTwo = this.state.config.tables;

		let seatsSittingOne = 0;
		let seatsSittingTwo = 0;

		const { sittingOne } = this.state.config;
		const { sittingTwo } = this.state.config;
		//köra en loop istället o ta bort ett bord för varje 6pers intervall och sedan räkna ut lediga platser per tid
		// console.log(6%6);
		// console.log(seatsSittingTwo);
		// console.log('calculating...');
		for(let i = 0; i < this.state.bookedTables.length; i++){
			let formattedBookedTime = moment(this.state.bookedTables[i].sitting, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');
			if(sittingOne === formattedBookedTime) {
				console.log('sitting one');
				console.log(this.state.bookedTables[i].guests);
				console.log('taken tables');
				console.log(Math.ceil(this.state.bookedTables[i].guests/6));
				tablesSittingOne -= Math.ceil(this.state.bookedTables[i].guests/6);
			}
			else if(sittingTwo === formattedBookedTime) {
				console.log('sitting two');
				console.log(this.state.bookedTables[i].guests);
				console.log('taken tables');
				console.log(Math.ceil(this.state.bookedTables[i].guests/6));
				tablesSittingTwo -= Math.ceil(this.state.bookedTables[i].guests/6);
			}
		}
		console.log('free tables sitting one');
		console.log(tablesSittingOne);
		console.log('free tables sitting two');
		console.log(tablesSittingTwo);

		seatsSittingOne = tablesSittingOne * 6;
		seatsSittingTwo = tablesSittingTwo * 6;

		console.log('free seats sitting one');
		console.log(seatsSittingOne);
		console.log('free seats sitting two');
		console.log(seatsSittingTwo);
		
	}

	render() {
		const { GDPRMessage } = this.state.config;
		// console.log('booking state');
		// console.log(this.state.bookings);
		// console.log('modulo');
		//med delat med, upp till 1 = 1 bord, upp till 2 = 2 bord
		//runda upp till närmaste heltal === antalet bord som behövs
		console.log(Math.ceil(11/6));

    return (
      <div className="Booking">
				<h1>Booking works</h1>
				<BookingCalendar handleDate={this.changeDate}/>
				<AvailableTables date={this.state.date} config={this.state.config}/>
				<button onClick={this.prepareBooking}>Send</button>
				<DetailsForm handleSubmit={this.handleSubmit} />

				<GDPR msg={GDPRMessage} />
      </div>
    );
	}
}

export default Booking;