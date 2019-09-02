import React from 'react';
import './Admin.css';
import {getAllBookings} from '../../utils/api-calls';

const axios = require('axios');

interface IBookingItem {
  booking_ID: number,
  costumer_ID: number,
  email: string,
  guests: number,
  name: string,
  phone: string,
  sitting: string
}

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
    console.log(booking);
    axios
    .put('http://localhost/Restaurangen/admin/update-booking.php/', JSON.stringify({booking_ID: booking.booking_ID, customer_ID : booking.costumer_ID, guests : booking.guests, sitting : booking.sitting}))
    .then((result: any) => {
      console.log(result);
    })
  }

  async deleteBookingWithID(targetID: number) {
    console.log(targetID);
    // axios.request({
    //   method: "delete",
    //   url: "http://localhost/Restaurangen/admin/delete-booking.php",
    //   data: JSON.stringify({
    //       booking_ID: targetID
    //     })
    //   });

     axios
     .delete('http://localhost/Restaurangen/admin/delete-booking.php', JSON.stringify({"booking_ID" : targetID}))
     .then((result: any) => {
       console.log(result.data);
     });
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
              <td>{booking.costumer_ID}</td>
              <td>{booking.email}</td>
              <td>{booking.guests}</td>
              <td>{booking.name}</td>
              <td>{booking.phone}</td>
              <td>{booking.sitting}</td>
              <td><button onClick={this.updateBookingWithID.bind(this, booking)}>Edit</button></td>
              <td><button onClick={this.deleteBookingWithID.bind(this, booking.booking_ID)}>Delete</button></td>
            </tr>
          ))}
          </tbody>
        </table> 
      </div>
    );

  }

}

export default Admin;