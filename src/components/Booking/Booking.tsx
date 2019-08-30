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
		const {} = this.state;
    return <></>;
	}
}

export default Booking;