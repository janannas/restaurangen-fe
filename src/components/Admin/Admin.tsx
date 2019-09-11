import React from 'react';
import './Admin.css';
import ApiCalls from '../../utils/ApiCalls';
import { IBookingItem } from '../../interfaces/IBookingItem';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IBookingState { 
  bookingInfo: IBookingItem[];
  on: boolean;
}

interface IAdminProps {
  history: {
		push: any
	}
}

class Admin extends React.Component< IAdminProps, IBookingState > {
  constructor(props: any) {
    super(props);

    this.state = {
      bookingInfo: [],
      on: false
    }

  }

  componentDidMount() {
    this.getBookings();
  }

      
  deleteBookingWithID = (targetID: any) => {
    if(window.confirm('Are you sure you want to delete this booking?')) {
      new ApiCalls().deleteBooking(targetID).then((result: any) => {
        this.props.history.push("/admin");
        this.getBookings();
      });
    }
	}

  public getBookings() {
    new ApiCalls()
    .getAllBookings().then((result: any) => {
        const isArr = Array.isArray(result.data);

        const storedInfo: IBookingItem[] = [];

        if (isArr) {
          this.setState({ bookingInfo: result.data });
        }
        else {         
          storedInfo.push(result.data);    
          this.setState({ bookingInfo: storedInfo });
        }
        
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

  render() {

    return (
    <div className="App">
      <div>
        <div className="booking-info-wrapper">
          <span className="booking-info-span"> Booking ID </span><span> | </span>
          <span className="booking-info-span"> Name </span><span> | </span>
          <span className="booking-info-span"> Nr of guests </span><span> | </span>
          <span className="booking-info-span"> Sitting </span><span> | </span>
        </div>

        <div>
          {this.state.bookingInfo.map((booking: IBookingItem) => (
          <div key={booking.booking_ID}>
            <span className="booking-info-span">{booking.booking_ID}</span>
            <span className="booking-info-span">{booking.name}</span>
            <span className="booking-info-span">{booking.guests}</span>
            <span className="booking-info-span">{booking.sitting}</span>
            <Link to={`accordion/${booking.booking_ID}`}><button type="button" className="btn btn-outline-secondary">Manage booking</button></Link>
            <button className="btn btn-outline-secondary" id="delete-button" onClick={() =>this.deleteBookingWithID(booking.booking_ID)}>Delete booking</button>
          </div>
          ))}
        </div>
      </div>

    </div>
    );
  }

}

export default Admin;