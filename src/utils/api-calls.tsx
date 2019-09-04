import axios from "axios";
import { IBooking } from "../interfaces/IBooking";

export function createBooking(booking: IBooking) {
  return axios.post("http://localhost/bookings/create-booking.php", JSON.stringify(booking));
}

export function fetchConfig() {
  return axios.get("http://localhost/bookings/get-configuration.php");
}

export function fetchBookedTables(checkDate: string) {
	console.log(typeof(checkDate));
	var jsonDate = JSON.stringify(checkDate);
	// return axios.post("http://localhost/bookings/get-booked-tables.php", {data: {"date": date}});

	// const bookingDate = {
	// 	date: date
	// };

	// axios.post('http://localhost/bookings/get-booked-tables.php', { bookingDate })
	// 	.then(res => {
	// 		console.log(res);
	// 		console.log(res.data);
	// 	})

// 	axios.post('http://localhost/bookings/get-booked-tables.php', { "date": checkDate })
//  .then((result: any) => {
// 	 console.log(result);
//  });

//  return axios({
//   method: 'post',
//   url: 'http://localhost/bookings/get-booked-tables.php',
//   data: {
// 		date: checkDate
//   }
// });

	// var postData = {
	// 	date: checkDate
	// };

	// let axiosConfig = {
	// 	headers: {
	// 			'Content-Type': 'application/json;charset=UTF-8',
	// 			"Access-Control-Allow-Origin": "*",
	// 	}
	// };

	// axios.post('http://localhost/bookings/get-booked-tables.php', postData, axiosConfig)
	// .then((res) => {
	// 	console.log("RESPONSE RECEIVED: ", res);
	// })
	// .catch((err) => {
	// 	console.log("AXIOS ERROR: ", err);
	// })

	//return axios.get('http://localhost/bookings/get-booked-tables.php/', {data: {"date": "2019-08-28"}})

	// axios.post('http://localhost/bookings/get-booked-tables.php/', {
	// 	date: '2019-08-28"'
	// }, {
	// 	headers: {
	// 		'Content-Type': 'application/json;charset=UTF-8'
	// 	}
	// })
	// .then(response => {
	// 	console.log(response)
	// })
	// .catch(error => {
	// 	console.log(error.response)
	// });


	axios.post('http://localhost/bookings/get-booked-tables.php/', {
		date: '2019-08-28"'
	}, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}
	})
	.then(response => {
		console.log(response)
	})
	.catch(error => {
		console.log(error.response)
	});

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