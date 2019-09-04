import axios from "axios";
import { IBooking } from "../interfaces/IBooking";

class ApiCalls {

  createBooking(booking: IBooking) {
    return axios.post("http://localhost/bookings/create-booking.php", JSON.stringify(booking));
  }

  fetchConfig() {
    return axios.get("http://localhost/bookings/get-configuration.php");
  }

  fetchBookedTables() {
    return axios.get("http://localhost/bookings/get-booked-tables.php");
  }

  getAllBookings() {
    return axios.get('http://localhost/admin/get-bookings.php');
  }

  deleteBooking(targetID: number) {
    return axios.delete('http://localhost/admin/delete-booking.php/', {data: {"booking_ID": targetID}})
  }

  updateBooking() {
    return axios.put('http://localhost/admin/update-booking.php');

  }
}

export default ApiCalls;