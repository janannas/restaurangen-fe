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

  getBookingsUrl = 'http://localhost:80/Restaurangen/admin/get-bookings.php';

  constructor(props: any) {
    super(props);

    this.state = {
      bookingInfo: []
    }
    
  }

  componentDidMount() {
    axios.get(this.getBookingsUrl)
      .then((result: any) => {
        const isArr = Array.isArray(result.data);
        console.log(isArr);
        console.log(result.lenght);

        const storedInfo: IBookingItem[] = [];

        if (isArr) {
          this.setState({ bookingInfo: result.data });
          console.log({ bookingInfo: result.data });
        }
        else {
          
          storedInfo.push(result.data);
          console.log(storedInfo);
        
          this.setState({ bookingInfo: storedInfo });
          console.log({ bookingInfo: storedInfo });
        }
        
      })
      .catch((error: string) => {
        console.log(error);
      });

  }

  render() {
  
    console.log(this.state.bookingInfo);

    return (
      <div className="App">
        <ul>
          {this.state.bookingInfo.map((booking: IBookingItem) => (
              <div key={booking.booking_ID}>
                <p>{booking.booking_ID}</p>
                <p>{booking.costumer_ID}</p>
                <p>{booking.email}</p>
                <p>{booking.guests}</p>
                <p>{booking.name}</p>
                <p>{booking.phone}</p>
                <p>{booking.sitting}</p>
              </div>
            )
          )}
        </ul> 
      </div>
    );

  }

}

export default Admin;