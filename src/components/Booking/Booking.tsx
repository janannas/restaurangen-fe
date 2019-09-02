import * as React from "react"; 
import Calendar from '../Calendar/Calendar';
import AvailableTables from '../AvailableTables/AvailableTables';

export interface IBookingProps { 
}

export interface IBookingState { 
	Date: string;
}

class Booking extends React.Component<IBookingProps, IBookingState> { 
	constructor(props: IBookingProps) {
		super(props);
		this.state = { Date: "" };
	}

	changeDate = (date: string) => {		
		this.setState({ Date: date });
	}

	render() {
    return (
      <div className="Booking">
          <h1>Booking works</h1>
					<Calendar handleDateClick={this.changeDate}/>
					<AvailableTables Date={this.state.Date}/>
      </div>
    );
	}
}

export default Booking;