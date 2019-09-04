import * as React from "react"; 
import ApiCalls from '../../utils/ApiCalls';
import BookingCalendar from '../BookingCalendar/BookingCalendar';
import AvailableTables from '../AvailableTables/AvailableTables';


export interface IBookingProps { 
}

export interface IBookingState { 
	date: string;
	config: {
		tables: string;
		sittingOne: string;
		sittingTwo: string;
		GDPRMessage: string;
	}
	
	formControls: {
		name: string;
		email: string;
		phone: string;
	}
}

class Booking extends React.Component<IBookingProps, IBookingState> { 
	constructor(props: IBookingProps) {
		super(props);
		this.state = { 
			date: "",
			config: {
				tables: "",
				sittingOne: "",
				sittingTwo: "",
				GDPRMessage: "",
			},
			formControls: {
				name: "",
				email: "",
				phone: "",
			}
		};
	}

	componentDidMount() {
		new ApiCalls().fetchConfig()
			.then((result: any) => {
				const data = result.data;

				let configObj = data.reduce((acc: any, obj: any) => {
					return { ...acc, [obj.key]: obj["value"]}
				}, {});

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

	changeDate = (date: string) => {		
		this.setState({ date: date });
		new ApiCalls().fetchBookedTables(date);
		// .then((result: any) => {
		// 	const data = result.data;

		// 	console.log(data)

		// })
		// .catch(error => {
		// 	console.log(error);
		// })

	}

	render() {
    return (
      <div className="Booking">
          <h1>Booking works</h1>
					<p>{this.state.config.sittingTwo}</p>
					<BookingCalendar handleDate={this.changeDate}/>
					<AvailableTables date={this.state.date}/>
      </div>
    );
	}
}

export default Booking;