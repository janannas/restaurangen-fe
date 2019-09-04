
import * as React from "react"; 
import ApiCalls from '../../utils/ApiCalls';
import BookingCalendar from '../BookingCalendar/BookingCalendar';
import AvailableTables from '../AvailableTables/AvailableTables';

import { IBooking } from "../../interfaces/IBooking";

import { DetailsForm } from "../DetailsForm/DetailsForm";
import { GDPR } from "../GDPR/GDPR";

export interface IDetails {
	name: string;
}

interface IBookingState {
	date: string;
	config: {
		tables: string;
		sittingOne: string;
		sittingTwo: string;
		GDPRMessage: string;
	}
	details: IDetails;
}

class Booking extends React.Component<{}, IBookingState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			date: "",
			config: {
				tables: "",
				sittingOne: "",
				sittingTwo: "",
				GDPRMessage: "",
			},
			details: {
				name: ''
			}
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

				this.setState(prevState => {
					let config = Object.assign({}, prevState.config);
					config.tables = configObj.tables;
					config.sittingOne = configObj.sitting_one;
					config.sittingTwo = configObj.sitting_two;
					config.GDPRMessage = configObj.GDPR;
					return { config };
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
	}

	render() {
		const { GDPRMessage } = this.state.config;

    return (
      <div className="Booking">
          <h1>Booking works</h1>
					<p>{this.state.config.sittingTwo}</p>
					<BookingCalendar handleDate={this.changeDate}/>
					<AvailableTables date={this.state.date}/>
					<button onClick={this.prepareBooking}>Send</button>
					<DetailsForm handleSubmit={this.handleSubmit} />

					<GDPR msg={GDPRMessage} />
      </div>
    );
	}
}

export default Booking;