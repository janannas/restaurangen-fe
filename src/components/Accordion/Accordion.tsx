import React from 'react';
import './Accordion.css' ;
import { NavLink } from 'react-router-dom';
import { IBookingItem } from '../../interfaces/IBookingItem';
import ApiCalls from '../../utils/ApiCalls';

const axios = require('axios');

interface IAccordionState {
    booking: IBookingItem[];
}

export interface IAccordionProps {
	match: {
		params: {
			id: any;
		}
	}
	history: {
		push: any
	}
}

class Accordion extends React.Component< IAccordionProps, IAccordionState> {
  constructor(props: any) {
    super(props);

    this.state = {
			booking: []
			
		}

		this.getBooking();
	}

	componentDidMount() {
		console.log(this.props.history);
		
	}
	
	public getBooking() {
    new ApiCalls()
    .getAllBookings().then((result: any) => {
			const data = result.data;
			const isArr = Array.isArray(result.data);
			var tempArray = [];
			var mapArray: any = [];

			if(data === ""){
					tempArray = [];
			}
			else if(isArr) {
				tempArray = data;
				tempArray.map((booking: IBookingItem) => {
					if(booking.booking_ID == this.props.match.params.id) {
						mapArray.push(booking);
					}
				});
			}
			this.setState({
				booking: mapArray
			});
	})
	.catch(error => {
			console.log(error);
	});

  }

  updateBooking(booking: IBookingItem) {
  //   axios({
  //     method: 'put',
  //     url: 'http://localhost/admin/update-booking.php/',
  //     data: {
  //     booking_ID: booking.booking_ID,
  //     customer_ID: booking.customer_ID,
  //     guests: booking.guests,
  //     sitting: booking.sitting
  //   }
  // });
    
        // axios
        // .put('http://localhost/Restaurangen/admin/update-booking.php/{booking.booking_ID}', booking)
        // .then((result: any) => {
        //   console.log(result);
        // })
    }
    
  deleteBookingWithID(targetID: number) {
    if(window.confirm('Are you sure you want to delete this booking?')) {
      new ApiCalls().deleteBooking(targetID).then((result: any) => {
				this.props.history.push("/admin");
				
      });
    }
  }

    // toggle = (on: boolean) => {
    //     console.log("Accordion");
    //     //this.props.toggle(on);
    //     this.setState({
    //         on: on
    //     })
    //     console.log(this.state.on);
    // }
  
  render() {
  
    return (
      <div className="accordion">
				<h1>Hello</h1>
					{this.state.booking.map((item) => (
						<div>
							<button onClick={this.updateBooking.bind(this, item)}>Edit</button>
							<button id="delete-button" onClick={() => this.deleteBookingWithID(item.booking_ID)}>Delete</button>
							<p>{item.customer_ID}</p>
							<p>{item.booking_ID}</p>
							<p>{item.email}</p>
							<p>{item.guests}</p>
							<p>{item.name}</p>
							<p>{item.phone}</p>
							<p>{item.sitting}</p>
						</div>
					))}
      </div>
		);
  }
}

export default Accordion;