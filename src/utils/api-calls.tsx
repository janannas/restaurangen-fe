import axios from "axios";
import { IBooking } from "../interfaces/IBooking";

export function createBooking(booking: IBooking) {
  return axios.post("http://localhost/bookings/create-booking.php", JSON.stringify(booking));
}

export function fetchConfig() {
  return axios.get("http://localhost/bookings/get-configuration.php");
}

export function fetchBookedTables() {
  return axios.get("http://localhost/bookings/get-booked-tables.php");
}

export function getAllBookings() {
  return axios.get('http://localhost/admin/get-bookings.php');
}

export function deleteBooking(targetID: number) {
  return axios.delete('http://localhost/admin/delete-booking.php/', {data: {"booking_ID": targetID}})
}

export function updateBooking() {
  return axios.put('http://localhost/admin/update-booking.php');

}