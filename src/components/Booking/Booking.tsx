import * as React from "react"; 
import BookingCalendar from '../BookingCalendar/BookingCalendar';
import AvailableTables from '../AvailableTables/AvailableTables';

export interface IBookingProps { 
}

export interface IBookingState { 
	date: string;
}

class Booking extends React.Component<IBookingProps, IBookingState> { 
	constructor(props: IBookingProps) {
		super(props);
		this.state = { date: "" };
	}

	changeDate = (date: string) => {		
		this.setState({ date: date });
	}

	render() {
    return (
      <div className="Booking">
          <h1>Booking works</h1>
					<BookingCalendar handleDate={this.changeDate}/>
					<AvailableTables date={this.state.date}/>
      </div>
    );
	}
}

export default Booking;