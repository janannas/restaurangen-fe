import React from 'react';
import './Details.css' ;
import { validate } from '../../utils/validation';
import { IBookingItem } from '../../interfaces/IBookingItem';
import ApiCalls from '../../utils/ApiCalls';
import { IUpdateBooking } from '../../interfaces/IUpdateBooking';
import { IUpdateCustomer } from '../../interfaces/IUpdateCustomer';
import FormTextControl from "../FormTextControl/FormTextControl";

const axios = require('axios');

export interface IAccordionProps {
	match: {
		params: {
			id: any;
		}
	}
	history: {
		push: any
	},
}

interface IDetailsState {
  formIsValid: boolean;

  booking: IUpdateBooking;

  formControls: {
    name: {
      value: string;
      valid: boolean;
      touched: boolean;
      validationRules: {
        isRequired: boolean;
      };
    };
    email: {
      value: string;
      valid: boolean;
      touched: boolean;
      validationRules: {
        isEmail: boolean;
      };
    };
    phone: {
      value: string;
      valid: boolean;
      touched: boolean;
      validationRules: {
        isNumber: boolean;
        minLength: 3;
      };
    };
  };
  error: string;
}

class Details extends React.Component< IAccordionProps, IDetailsState> {
  constructor(props: any) {
		super(props);
		
		this.state = {
      formIsValid: false, //tracks the overall form validity

			booking: {
        booking_ID: 0,
			  customer_ID: 0,
		  	guests: 0,
        sitting: ''
      },

      formControls: {
        name: {
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true
          }
        },
        email: {
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            isEmail: true
          }
        },
        phone: {
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            isNumber: true,
            minLength: 3
          }
        }
      },

      error: ""
		};
  
	}

	componentDidMount() {
    this.getBooking();
	}
	
	public getBooking() {
    new ApiCalls()
    .getAllBookings().then((result: any) => {
			var tempArray: IBookingItem[] = [];
			var mapArray: IBookingItem = {
        booking_ID: 0,
        customer_ID: 0,
        email:'',
        guests: 0,
        name: '',
        phone: '',
        sitting: ''
			};

			tempArray = result.data;
			tempArray.map((booking: IBookingItem) => {
				if(booking.booking_ID === this.props.match.params.id) {
					mapArray = booking;
				}
			});

			this.setState({
				booking: {
          booking_ID: mapArray.booking_ID,
				  customer_ID: mapArray.customer_ID,
			  	guests: mapArray.guests,
          sitting: mapArray.sitting
        },
        formControls: {
          name: {
            value: mapArray.name,
            valid: false,
            touched: false,
            validationRules: {
              isRequired: true
            }
          },
          email: {
            value: mapArray.email,
            valid: false,
            touched: false,
            validationRules: {
              isEmail: true
            }
          },
          phone: {
            value: mapArray.phone,
            valid: false,
            touched: false,
            validationRules: {
              isNumber: true,
              minLength: 3
            }
          }
        },

			});
	})
	.catch(error => {
		console.log(error);
	});
	}

	handleInputChange = async (event: any) =>{
		// const target = event.target;
		// const value = target.value;

		// await this.setState({
		// 	[target.name]: value
    // } as any);
    
    const name: keyof IDetailsState["formControls"] = event.target.name;
    const value = event.target.value;

    const updatedControls = {
      ...this.state.formControls
    };

    let updatedControl = updatedControls[name];

    updatedControl.value = value;

    // Don't want to validate the first time user touches input-field
    if (updatedControl.touched) {
      updatedControl.valid = validate(value, updatedControl.validationRules);
    }

    // Submit button gets activated soon as form i valid
    let formIsValid: boolean = this.validateForm();

    this.setState({
      formIsValid: formIsValid,
      formControls: updatedControls
    });

	}

	updateCustomer = (customerToUpdate: IUpdateCustomer) => {
		axios
    	.put('http://localhost/admin/update-customer.php/', customerToUpdate)
    	.then(() => {
				this.props.history.push("/admin");
			})
	}

	// updateBooking = (bookingToUpdate: IUpdateBooking) => {
	// 	axios
  //   	.put('http://localhost/admin/update-booking.php/', bookingToUpdate)
  //   	.then(() => {
	// 			this.props.history.push("/admin");
	// 		})
  // }

  validateForm = () => {
    const updatedControls = {
      ...this.state.formControls
    };

    // temp object to set state
    let formIsValid: boolean = true;
    let inputIdentifier: keyof IDetailsState["formControls"];

    // Checking that all controls are valid
    for (inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      formIsValid: formIsValid
    });

    return formIsValid;
  }
  
  validateControl = (event: any) => {
    const name: keyof IDetailsState["formControls"] = event.target.name;

    const updatedControls = {
      ...this.state.formControls
    };

    let updatedControl = updatedControls[name];

    updatedControl.touched = true;
    updatedControl.valid = validate(updatedControl.value, updatedControl.validationRules);

    this.setState({
      formControls: updatedControls
    });
  }
  
  triggerAllValidation = (event: any) => {
    this.validateControl(event);
    this.validateForm();
  }
	
	handleSubmit = (event: any) => {
	 	event.preventDefault();

	 	//var bookingToUpdate: IUpdateBooking;
	 	var customerToUpdate: IUpdateCustomer;

	 	customerToUpdate = {
	 		customer_ID: this.state.booking.customer_ID,
	 		name: this.state.formControls.name.value,
	 		email: this.state.formControls.email.value,
	 		phone: this.state.formControls.phone.value
     }
     console.log(this.state.booking.customer_ID);

	 	// bookingToUpdate = {
	  // 	booking_ID: this.state.booking.booking_ID,
	 	//   customer_ID: this.state.booking.customer_ID,
	 	//   guests: this.state.booking.guests,
	  // 	sitting: this.state.booking.sitting
	 	// }

	 	if(window.confirm('Are you sure you want to save this update?')) {
	 		this.updateCustomer(customerToUpdate);
	 		// this.updateBooking(bookingToUpdate);
	 	}
		
	}
  
  render() {
    return (
			<div className="details-wrapper">
				<h3 className="m-4 text-center">Handling booking with id: {this.state.booking.booking_ID}</h3>
				
				<p className="mb-1 text-center">If you want to delete this booking, click the "delete" button below</p>
				<p className="mb-4 text-center">If you want to edit this booking, make your changes and click the "save changes" button</p>
				
				<form onSubmit={(e) => this.handleSubmit(e)} className="details-form pt-2">
          <label htmlFor="customer_ID">Customer ID: </label>
          <input disabled id="customer_ID" value={this.state.booking.customer_ID}></input>
          <label htmlFor="booking_ID">Booking ID: </label>
          <input disabled id="booking_ID" value={this.state.booking.booking_ID}></input>
          <label htmlFor="sitting">Sitting: </label>
          <input disabled id="sitting" value={this.state.booking.sitting}></input>
          <label htmlFor="guests">Number fo guests: </label>
          <input disabled id="guests" value={this.state.booking.guests}></input>
          

        <FormTextControl
          name="name"
          htmlFor="name"
          onChange={this.handleInputChange}
          onBlur={this.triggerAllValidation}
          value={this.state.formControls.name.value}
          id="name"
          label="Name: "
          touched={this.state.formControls.name.touched ? 1 : 0}
          valid={this.state.formControls.name.valid ? 1 : 0}
          error={"Field is required"}
        />

        <FormTextControl
          name="email"
          htmlFor="email"
          onChange={this.handleInputChange}
          onBlur={this.triggerAllValidation}
          value={this.state.formControls.email.value}
          id="email"
          label="Email: "
          touched={this.state.formControls.email.touched ? 1 : 0}
          valid={this.state.formControls.email.valid ? 1 : 0}
          error={"Please enter a valid email-address"}
        />

        <FormTextControl
          name="phone"
          htmlFor="phone"
          onChange={this.handleInputChange}
          onBlur={this.triggerAllValidation}
          value={this.state.formControls.phone.value}
          id="phone"
          label="Phone Number: "
          touched={this.state.formControls.phone.touched ? 1 : 0}
          valid={this.state.formControls.phone.valid ? 1 : 0}
          error={"Please enter at least three digits"}
        />

        <button type="submit" disabled={!this.state.formIsValid}>Submit changes</button>




					{/* <div className="form-row">
						<div className="form-group d-flex flex-column col-12 col-md-4">
							<label htmlFor="customerID">Customer ID</label>
							<input disabled value={this.state.customer_ID} id="customerID" />
						</div>

						<div className="form-group d-flex flex-column col-12 col-md-4">
							<label htmlFor="bookingID">Booking ID</label>
							<input disabled value={this.state.booking_ID} id="bookingID"/>
						</div>

						<div className="form-group d-flex flex-column col-12 col-md-4">
							<label htmlFor="sitting">Sitting</label>
							<input disabled value={this.state.sitting} onChange={(e) => this.handleInputChange(e)} />
						</div>

						<div className="form-group d-flex flex-column col-12 col-md-6">
							<label htmlFor="email">Email</label>
							<input type="email" required name="email" id="email" value={this.state.email} onChange={(e) => this.handleInputChange(e)} />
						</div>

						<div className="form-group d-flex flex-column col-12 col-md-6">
							<label htmlFor="guests">Number of guests</label>
							<input type="number" required name="guests" id="guests" value={this.state.guests} onChange={(e) => this.handleInputChange(e)} />
						</div>

						<div className="form-group d-flex flex-column col-12 col-md-6">
							<label htmlFor="name">Name</label>
							<input type="text" required name="name" id="name" value={this.state.name} onChange={(e) => this.handleInputChange(e)} />
						</div>

						<div className="form-group d-flex flex-column col-12 col-md-6">
							<label htmlFor="phone">Phone number</label>
							<input type="tel" required name="phone" id="phone" value={this.state.phone} onChange={(e) => this.handleInputChange(e)} />
						</div>


						<div className="form-group col-12">
							<button className="btn btn-outline-secondary" id="delete-button" onClick={() =>this.deleteBookingWithID(this.state.booking_ID)}>Delete booking</button>
							<button className="btn btn-outline-secondary ml-2" type="submit">Save Changes</button>
						</div>

					</div> */}
				</form>
			</div>
		);
  }
}

export default Details;