import React, { Component } from "react";

import { fetchConfig, createBooking } from "../../utils/api-calls";

import { IBooking } from "../../interfaces/IBooking";

import { DetailsForm } from "../DetailsForm/DetailsForm";
import { GDPR } from "../GDPR/GDPR";

interface IBookingState {
	GDPRMessage: string;
	formControls: IFormControls;
}

interface IFormControls {
	name: IFormControlContent;
	email: IFormControlContent;
	phone: IFormControlContent;
}

interface IFormControlContent {
	value: string;
}

class Booking extends Component<{}, IBookingState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			GDPRMessage: "",

			formControls: {
				name: {
					value: ""
				},
				email: {
					value: ""
				},
				phone: {
					value: ""
				}
			}
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

	handleChange = (event: any): void => {
		const name: keyof IFormControls = event.target.name;
		const value = event.target.value;

		const updatedControls = {
			...this.state.formControls
		};

		let updatedControl = updatedControls[name];

		updatedControl.value = value;

		this.setState({
			formControls: updatedControls
		});
	}

	handleForm = (event: React.SyntheticEvent) => {
		event.preventDefault();
		const { name, email, phone } = this.state.formControls;
		console.log(name, email, phone);
	}

	handleKeyPress = () => {
		// TODO: Detect if enter was pressed
	}

	bookingObj = (): IBooking => {
		const { name, email, phone } = this.state.formControls;

		return {
			name: name.value,
			email: email.value,
			phone: phone.value,
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
		const { GDPRMessage, formControls } = this.state;

		return (
			<>
				<button onClick={this.prepareBooking}>Send</button>

				<DetailsForm
					handleForm={this.handleForm}
					handleKeyPress={this.handleKeyPress}
					handleChange={this.handleChange}
					nameValue={formControls.name.value}
					emailValue={formControls.email.value}
					phoneValue={formControls.phone.value}
				/>

				<GDPR msg={GDPRMessage} />
			</>
		);
	}
}

export default Booking;