import React from 'react';
import './Admin.css';
import {getAllBookings} from '../../utils/api-calls';
import {deleteBooking} from '../../utils/api-calls';
import {IBookingItem} from '../../interfaces/IBookingItem';

const axios = require('axios');

interface IBookingState { 
  bookingInfo: IBookingItem[];
}

class Admin extends React.Component< {}, IBookingState > {

  constructor(props: any) {
    super(props);

    this.state = {
      bookingInfo: []
    }
    
  }

  componentDidMount() {
    this.getAllBookings();
  }

  getAllBookings = () => {
      getAllBookings().then((result: any) => {
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

  updateBookingWithID(booking: IBookingItem) {
    axios({
      method: 'put',
      url: 'http://localhost/admin/update-booking.php/',
      data: {
        booking_ID: booking.booking_ID,
        customer_ID: booking.customer_ID,
        guests: booking.guests,
        sitting: booking.sitting
      }
    });
    // console.log(booking);
    // axios
    // .put('http://localhost/Restaurangen/admin/update-booking.php/{booking.booking_ID}', booking)
    // .then((result: any) => {
    //   console.log(result);
    // })
  }

  deleteBookingWithID = (targetID: number) => {
    if(window.confirm('Are you sure you want to delete this booking?')) {
      deleteBooking(targetID).then((result: any) => {
        this.getAllBookings();
       });
    }
  }

  render() {

    return (
    <div className="App">
        <table>
        <tr>
          <th>Booking ID</th>
          <th>Customer ID</th>
          <th>Email</th> 
          <th>Guests</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Sitting</th>
        </tr>
        <tbody>
          {this.state.bookingInfo.map((booking: IBookingItem) => (
            <tr key={booking.booking_ID}>
              <td>{booking.booking_ID}</td>
              <td>{booking.customer_ID}</td>
              <td>{booking.email}</td>
              <td>{booking.guests}</td>
              <td>{booking.name}</td>
              <td>{booking.phone}</td>
              <td>{booking.sitting}</td>
              <td><button onClick={this.updateBookingWithID.bind(this, booking)}>Edit</button></td>
              <td><button onClick={() => this.deleteBookingWithID(booking.booking_ID)}>Delete</button></td>
            </tr>
          ))}
          </tbody>
        </table> 
      </div>
    );

  }

}

export default Admin;