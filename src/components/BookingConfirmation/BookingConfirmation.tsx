import * as React from "react";
import './BookingConfiramtion.css';
import { Link } from 'react-router-dom';

interface IBookingConfirmationProp {
	name: string;
	date: string;
	time: string;
}

const BookingConfirmation = ({ name, date, time }: IBookingConfirmationProp) => {
	return (
		<section className="mt-5 mb-5 ml-1 mr-1 row d-flex justify-content-center">
			<div className="col-sm-12 col-md-10 col-lg-7">

				<div className="booking-confirmation">
					<h2 className="text-center font-weight-light">
						Thanks
						<br />
						for
						<br />
						your booking {name}!
					</h2>

					<h1 className="text-center mb-5 heading2">
						You are warmly welcome to our restaurant:
						<br />
						kl.{time}, the {date}
					</h1>

					<p className="text-center">
						Please check your email for further
						<br />
						information regarding your booking
					</p>

					<div className="d-flex justify-content-center">
						<Link to='/'>
							<button className="submit-form-button btn">BACK TO HOMEPAGE</button>
						</Link>
					</div>

					<small className="text-center d-block secondary-text-color">
						Keep in mind we only take card
					</small>
				</div>

				<p className="mt-5 mb-0 d-block text-left secondary-text-size secondary-text-color">
					If you have any questions, please give us a call or email:
					<br /><span className="pl-0 primary-blue-color">&#9658;</span>+46 070123 44 88
					<br /><span className="pl-0 primary-blue-color">&#9658;</span>bookings@lacasadelmar.com
				</p>
			</div>
		</section >
	);
}

export default BookingConfirmation;
