import React from 'react';
import './Details.css' ;
import { NavLink } from 'react-router-dom';
import { IBookingItem } from '../../interfaces/IBookingItem';
import ApiCalls from '../../utils/ApiCalls';

const axios = require('axios');

interface IAccordionState {
    booking: IBookingItem[];
}

export interface IAccordionProps {
	match: {
		params: {
			id: any;
		}
	}
	history: {
		push: any
	}
}

class Details extends React.Component< IAccordionProps, IAccordionState> {
  constructor(props: any) {
    super(props);

    this.state = {
			booking: []
		}

		this.getBooking();
	}
	
	public getBooking() {
    new ApiCalls()
    .getAllBookings().then((result: any) => {
			var tempArray = [];
			var mapArray: any = [];

			tempArray = result.data;
			tempArray.map((booking: IBookingItem) => {
				if(booking.booking_ID == this.props.match.params.id) {
					mapArray.push(booking);
				}
			});

			this.setState({
				booking: mapArray
			});

			console.log(this.state);
	})
	.catch(error => {
			console.log(error);
	});
	}

  updateBooking(booking: IBookingItem) {  
    axios
    .put('http://localhost/Restaurangen/admin/update-booking.php/{booking.booking_ID}', booking)
    .then((result: any) => {
    console.log(result);
      })
    }
    
  deleteBookingWithID = (targetID: any) => {
    if(window.confirm('Are you sure you want to delete this booking?')) {
      new ApiCalls().deleteBooking(targetID).then((result: any) => {
				this.props.history.push("/admin");
      });
    }
	}

	handleInputChange = (event: any) =>{
			const target = event.target;
			const value = target.value;

			console.log(event.target.value);

			let bookingObject = this.state.booking;
			console.log(bookingObject);
			bookingObject[0].customer_ID = event.target.value;

			this.setState({
				booking: bookingObject
			})

			// let bookingObj = {
			// 	booking_ID: booking.booking_ID,
    	// 	customer_ID: booking.customer_ID,
    	// 	email: booking.email,
    	// 	guests: booking.guests,
    	// 	name: booking.name,
    	// 	phone: booking.phone,
    	// 	sitting: booking.sitting
			// }
	
			// this.setState({
			// 	booking: 
			// });
	}
	
	handleSubmit = (event: any, item: IBookingItem) => {
		let object = {
			booking_ID: item.booking_ID,
			customer_ID: item.customer_ID,
			email: item.email,
			guests: item.guests,
			name: item.name,
			phone: item.phone,
			sitting: item.sitting
		}

		console.log(object);

		// this.setState({
		// 	booking: object
		// });

	 	alert(`${this.state.booking}`);
	 	event.preventDefault();
	}
  
  render() {
    return (
			<div>
				{this.state.booking.map((item) => (
				<form onSubmit={(e) => this.handleSubmit(e, item)} className="update-form">
					<div>
						<input type="text" value={item.customer_ID} onChange={(e) => this.handleInputChange(e)} />
						<input type="text" value={item.booking_ID} onChange={(e) => this.handleInputChange(e)} />
						<input type="text" value={item.email} onChange={(e) => this.handleInputChange(e)} />
						<input type="text" value={item.guests} onChange={(e) => this.handleInputChange(e)} />
						<input type="text" value={item.name} onChange={(e) => this.handleInputChange(e)} />
						<input type="text" value={item.phone} onChange={(e) => this.handleInputChange(e)} />
						<input type="text" value={item.sitting} onChange={(e) => this.handleInputChange(e)} />
						<button onClick={this.updateBooking.bind(this, item)}>Edit</button>
						<button id="delete-button" onClick={() =>this.deleteBookingWithID(item.booking_ID)}>Delete</button>
						<button type="submit">Submit</button>
					</div>
			</form>
			))}
			</div>
		);
  }
}

export default Details;