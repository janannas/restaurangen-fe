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
			<div className="details-wrapper">
				<h3 className="m-4 text-center">Handling booking with id: {this.state.booking_ID}</h3>
				
				<p className="mb-1 text-center">If you want to delete this booking, click the "delete" button below</p>
				<p className="mb-4 text-center">If you want to edit this booking, make your changes and click the "save changes" button</p>
				
				<form onSubmit={(e) => this.handleSubmit(e)} className="details-form pt-2">
					<div className="form-row">
						<div className="form-group d-flex flex-column col-12 col-md-4">
							<label htmlFor="customerID">Customer ID</label>
							<input disabled value={this.state.customer_ID} id="customerID" />
						</div>

						<div className="form-group d-flex flex-column col-12 col-md-4">
							<label htmlFor="bookingID">Booking ID</label>
							<input disabled value={this.state.booking_ID} id="bookingID"/>
						</div>

						<div className="form-group d-flex flex-column col-12 col-md-4">
							<label htmlFor="sitting">Sitting</label>
							<input disabled value={this.state.sitting} onChange={(e) => this.handleInputChange(e)} />
						</div>

						<div className="form-group d-flex flex-column col-12 col-md-6">
							<label htmlFor="email">Email</label>
							<input type="email" required name="email" id="email" value={this.state.email} onChange={(e) => this.handleInputChange(e)} />
						</div>

						<div className="form-group d-flex flex-column col-12 col-md-6">
							<label htmlFor="guests">Number of guests</label>
							<input type="number" required name="guests" id="guests" value={this.state.guests} onChange={(e) => this.handleInputChange(e)} />
						</div>

						<div className="form-group d-flex flex-column col-12 col-md-6">
							<label htmlFor="name">Name</label>
							<input type="text" required name="name" id="name" value={this.state.name} onChange={(e) => this.handleInputChange(e)} />
						</div>

						<div className="form-group d-flex flex-column col-12 col-md-6">
							<label htmlFor="phone">Phone number</label>
							<input type="tel" required name="phone" id="phone" value={this.state.phone} onChange={(e) => this.handleInputChange(e)} />
						</div>


						<div className="form-group col-12">
							<button className="btn btn-outline-secondary" id="delete-button" onClick={() =>this.deleteBookingWithID(this.state.booking_ID)}>Delete booking</button>
							<button className="btn btn-outline-secondary ml-2" type="submit">Save Changes</button>
						</div>

					</div>
				</form>
			</div>
		);
  }
}

export default Details;