import React from 'react';
import './Admin.css';
import ApiCalls from '../../utils/ApiCalls';
import { IBookingItem } from '../../interfaces/IBookingItem';
import { Link } from 'react-router-dom';

//const axios = require('axios');

export interface IBookingState { 
  bookingInfo: IBookingItem[];
  on: boolean;
}

class Admin extends React.Component< {}, IBookingState > {
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
            <Link to={`accordion/${booking.booking_ID}`}><button type="button" className="btn btn-outline-secondary">Handle booking</button></Link>
          </div>
          ))}
        </div>
      </div>

    </div>
    );
  }

}

export default Admin;