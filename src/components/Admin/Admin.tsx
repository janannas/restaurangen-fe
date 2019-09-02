import React from 'react';
import './Admin.css';

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

  getBookingsUrl = 'http://localhost:8888/Restaurangen/admin/get-bookings.php';

  constructor(props: any) {
    super(props);

    this.state = {
      bookingInfo: []
    }
    
  }

  componentDidMount() {

    this.getAllBookings();

  }

  getAllBookings() {
    axios.get(this.getBookingsUrl)
      .then((result: any) => {
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

  deleteBookingWithID() {

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
          {this.state.bookingInfo.map((booking: IBookingItem) => (
              <tr key={booking.booking_ID}>
                <td>{booking.booking_ID}</td>
                <td>{booking.costumer_ID}</td>
                <td>{booking.email}</td>
                <td>{booking.guests}</td>
                <td>{booking.name}</td>
                <td>{booking.phone}</td>
                <td>{booking.sitting}</td>
                <td><button>Edit</button></td>
                <td><button>Delete</button></td>
              </tr>
            )
          )}
        </table> 
      </div>
    );

  }

}

export default Admin;