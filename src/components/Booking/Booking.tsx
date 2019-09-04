import React, { Component } from "react";

import { fetchConfig, createBooking } from "../../utils/api-calls";

import { IBooking } from "../../interfaces/IBooking";

import { DetailsForm } from "../DetailsForm/DetailsForm";
import { GDPR } from "../GDPR/GDPR";

interface IBookingState {
	GDPRMessage: string;
}

class Booking extends Component<{}, IBookingState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			GDPRMessage: "",
		}
	}

	componentDidMount() {
		fetchConfig()
			.then((result: any) => {
				const data = result.data;

				let configObj = data.reduce((acc: any, obj: any) => {
					return { ...acc, [obj.key]: obj["value"] }
				}, {});

				// TODO: remove
				console.log(configObj.GDPR);

				this.setState({
					GDPRMessage: configObj.GDPR
				})

			})
			.catch(error => {
				console.log(error);
			})
	}

	// TODO: Add to separate function together with prepareBooking
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

		createBooking(obj)
			.then((result: any) => {
				console.log(result.data);
			})
			.catch(error => {
				console.log(error);
			})
	}

	public render() {
		const { GDPRMessage } = this.state;

		return (
			<>
				<button onClick={this.prepareBooking}>Send</button>

				<DetailsForm />

				<GDPR msg={GDPRMessage} />
			</>
		);
	}
}

export default Booking;