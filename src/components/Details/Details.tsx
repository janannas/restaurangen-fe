import React from 'react';
import './Details.css' ;
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

class Details extends React.Component< IAccordionProps, IAccordionState> {
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
		console.log(booking);
     axios({
       method: 'put',
       url: 'http://localhost/admin/update-booking.php/',
       data: {
       booking_ID: booking.booking_ID,
       customer_ID: booking.customer_ID,
       guests: 6,
       sitting: booking.sitting
      }
	  });
    
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
  
  render() {
    return (
    <div className="accordion">
			{this.state.booking.map((item) => (
				<div>
					<input type="text" value={item.customer_ID} />
					<input type="text" value={item.booking_ID}/>
					<input type="text" value={item.email}/>
					<input type="text" value={item.guests}/>
					<input type="text" value={item.name}/>
					<input type="text" value={item.phone}/>
					<input type="text" value={item.sitting}/>
					<button onClick={this.updateBooking.bind(this, item)}>Edit</button>
					<button id="delete-button" onClick={() => this.deleteBookingWithID(item.booking_ID)}>Delete</button>
				</div>
		))}
    </div>
		);
  }
}

export default Details;