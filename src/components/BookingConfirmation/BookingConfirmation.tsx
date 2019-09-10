import * as React from "react"; 

export interface IBookingConfirmationProp {
	name: string;
}

class BookingConfirmation extends React.Component<IBookingConfirmationProp, {}> { 
	constructor(props: any) {
		super(props);

	}

	public render() {

		return (
			<div>
				<h1>Thanks for your order {this.props.name}!</h1>
				<p>Please check your email for further information</p>
			</div>
		); 
	}
}

export default BookingConfirmation;