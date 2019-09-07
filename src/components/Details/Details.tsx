import React from 'react';
import './Details.css' ;
import { IBookingItem } from '../../interfaces/IBookingItem';
import ApiCalls from '../../utils/ApiCalls';
import { IUpdateBooking } from '../../interfaces/IUpdateBooking';
import { IUpdateCustomer } from '../../interfaces/IUpdateCustomer';

const axios = require('axios');

export interface IAccordionProps {
	match: {
		params: {
			id: any;
		}
	}
	history: {
		push: any
	},
}

class Details extends React.Component< IAccordionProps, IBookingItem> {
  constructor(props: any) {
		super(props);
		
		this.state = {
				booking_ID: 0,
				customer_ID: 0,
				email:'',
				guests: 0,
				name: '',
				phone: '',
				sitting: ''
		};
  
	}

	componentDidMount() {
		this.getBooking();
	}
	
	public getBooking() {
    new ApiCalls()
    .getAllBookings().then((result: any) => {
			var tempArray: IBookingItem[] = [];
			var mapArray: IBookingItem = {
				booking_ID: 0,
				customer_ID: 0,
				email:'',
				guests: 0,
				name: '',
				phone: '',
				sitting: ''
			};

			tempArray = result.data;
			tempArray.map((booking: IBookingItem) => {
				if(booking.booking_ID === this.props.match.params.id) {
					mapArray = booking;
				}
			});

			this.setState({
				booking_ID: mapArray.booking_ID,
				customer_ID: mapArray.customer_ID,
				email: mapArray.email,
				guests: mapArray.guests,
				name: mapArray.name,
				phone: mapArray.phone,
				sitting: mapArray.sitting
			});
	})
	.catch(error => {
			console.log(error);
	});
	}
    
  deleteBookingWithID = (targetID: any) => {
    if(window.confirm('Are you sure you want to delete this booking?')) {
      new ApiCalls().deleteBooking(targetID).then((result: any) => {
				this.props.history.push("/admin");
      });
    }
	}

	handleInputChange = async (event: any) =>{
			const target = event.target;
			const value = target.value;

			await this.setState({
				[target.name]: value
			} as any);

			console.log(this.state);
	}

	updateCustomer = (customerToUpdate: IUpdateCustomer) => {
		axios
    	.put('http://localhost/admin/update-customer.php/', customerToUpdate)
    	.then(() => {
				this.props.history.push("/admin");
			})
	}

	updateBooking = (bookingToUpdate: IUpdateBooking) => {
		axios
    	.put('http://localhost/admin/update-booking.php/', bookingToUpdate)
    	.then(() => {
				this.props.history.push("/admin");
			})
	}

	
	handleSubmit = (event: any) => {
		event.preventDefault();

		var bookingToUpdate: IUpdateBooking;
		var customerToUpdate: IUpdateCustomer;

		customerToUpdate = {
			customer_ID: this.state.customer_ID,
			name: this.state.name,
			email: this.state.email,
			phone: this.state.phone
		}

		bookingToUpdate = {
		booking_ID: this.state.booking_ID,
		customer_ID: this.state.customer_ID,
		guests: this.state.guests,
		sitting: this.state.sitting
		}

		if(window.confirm('Are you sure you want to save this update?')) {
			this.updateCustomer(customerToUpdate);
			this.updateBooking(bookingToUpdate);
		}
		
	}
  
  render() {
    return (
			<div>
				<form onSubmit={(e) => this.handleSubmit(e)} className="update-form">
					<div>
						<input type="text" name="customer_ID" value={this.state.customer_ID} onChange={(e) => this.handleInputChange(e)} />
						<input type="text" name="booking_ID" value={this.state.booking_ID} onChange={(e) => this.handleInputChange(e)} />
						<input type="text" name="email" value={this.state.email} onChange={(e) => this.handleInputChange(e)} />
						<input type="text" name="guests" value={this.state.guests} onChange={(e) => this.handleInputChange(e)} />
						<input type="text" name="name" value={this.state.name} onChange={(e) => this.handleInputChange(e)} />
						<input type="text" name="phone" value={this.state.phone} onChange={(e) => this.handleInputChange(e)} />
						<input type="text" name="sitting" value={this.state.sitting} onChange={(e) => this.handleInputChange(e)} />
						<button id="delete-button" onClick={() =>this.deleteBookingWithID(this.state.booking_ID)}>Delete</button>
						<button type="submit">Submit</button>
					</div>
				</form>
			</div>
		);
  }
}

export default Details;