import React from 'react';
import './Admin.css';
import { Link } from 'react-router-dom';

import ApiCalls from '../../utils/ApiCalls';
import { IBookingItem } from '../../interfaces/IBookingItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fab, faEdit, faTrashAlt);

require('bootstrap');

interface IAdminProps {
  history: {
    push: any
  }
}

interface IAdminState {
  bookingInfo: IBookingItem[];
}

class Admin extends React.Component<IAdminProps, IAdminState> {
  constructor(props: IAdminProps) {
    super(props);

    this.state = {
      bookingInfo: []
    }
  }

  componentDidMount() {
    this.getBookings();
  }

  deleteBookingWithID = (targetID: any) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      new ApiCalls().deleteBooking(targetID).then((result: any) => {
        this.props.history.push("/admin");
        this.getBookings();
      });
    }
  }

  getBookings() {
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
        <div className="booking-info-wrapper">
          <table className="table mt-3 mb-3">

            <thead>
              <tr>
                <th scope="col">Booking ID</th>
                <th scope="col">Name</th>
                <th scope="col">Nr of guests</th>
                <th scope="col">Sitting</th>
              </tr>
            </thead>

            <tbody>
              {this.state.bookingInfo.map((booking: IBookingItem) => (
                <tr key={booking.booking_ID}>
                  <td>{booking.booking_ID}</td>
                  <td>{booking.name}</td>
                  <td>{booking.guests}</td>
                  <td>{booking.sitting}</td>
                  <td>
                    <Link to={`accordion/${booking.booking_ID}`}><button type="button" className="btn admin-btn submit-form-button"><FontAwesomeIcon icon='edit' /></button></Link>
                    <button className="btn admin-btn submit-form-button" id="delete-button" onClick={() => this.deleteBookingWithID(booking.booking_ID)}><FontAwesomeIcon icon='trash-alt' /></button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    );
  }

}

export default Admin;