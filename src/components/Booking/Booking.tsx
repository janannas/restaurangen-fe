import * as React from "react"; 

export interface IBookingProps { 
}

export interface IBookingState { 
}

class Booking extends React.Component<IBookingProps, IBookingState> { 
	constructor(props: IBookingProps) {
		super(props);
	}

	public render() {
		return (
			<div></div>
		); 
	}
}

export default Booking;