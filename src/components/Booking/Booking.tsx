import * as React from "react"; 
import Calendar from '../Calendar/Calendar';
import AvailableTables from '../AvailableTables/AvailableTables';

export interface IBookingProps { 
}

export interface IBookingState { 
}

class Booking extends React.Component<IBookingProps, IBookingState> { 
	constructor(props: IBookingProps) {
		super(props);
	}

	render() {
		// const {} = this.state;
    return (
      <div className="Booking">
          <h1>Booking works</h1>
					<Calendar />
					<AvailableTables />
      </div>
    );
	}
}

export default Booking;