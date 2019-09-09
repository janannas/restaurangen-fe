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

  toggle = () => {
    var bool = !this.state.on;
    this.setState({
      on: bool
    })
  }

  render() {

    return (
    <div className="App">
      <div className="accordion">
        <div className="accordion-title">
          <span> Booking ID </span><span> | </span>
          <span> Name </span><span> | </span>
          <span> Nr of guests </span><span> | </span>
          <span> Sitting </span><span> | </span>
        </div>

      <div className="accordion-body">
        {this.state.bookingInfo.map((booking: IBookingItem) => (
          <div className="accordion-header" key={booking.booking_ID}>
            <Link to={`accordion/${booking.booking_ID}`}><button type="button" className="btn btn-outline-secondary">See Project</button></Link>
            <span>{booking.booking_ID}</span>
            <span>{booking.name}</span>
            <span>{booking.guests}</span>
            <span>{booking.sitting}</span>
            {/* <button onClick={this.toggle}>Show/hide</button> */}
          </div>
        ))}
      </div>


      </div>
    </div>
    );
  }

}

export default Admin;