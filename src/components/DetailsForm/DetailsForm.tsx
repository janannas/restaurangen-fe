import React, { Component } from 'react';

import { IFormControls } from '../../interfaces/IFormControls';

import { FormTextControl } from "../FormTextControl/FormTextControl";
import { validate } from '../../utils/validation';
import { IDetails } from '../Booking/Booking';

interface IProps {
  changeHandler: any;
}

interface IState {
  formControls: IFormControls;
  error: string;
}

<<<<<<< HEAD
interface IDetailsFormProps {
	handleSubmit(details: IDetails) : void;	
}

export class DetailsForm extends Component<IDetailsFormProps, IState> {
  constructor(props: IDetailsFormProps) {
=======
export class DetailsForm extends Component<IProps, IState> {
  constructor(props: IProps) {
>>>>>>> 1776db0387266a7bcd04761763f1e362637c3f72
    super(props);

    this.state = {
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
            isRequired: true
          }
        },
        phone: {
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true
          }
        }
      },

      error: ""
    }
  }

  handleKeyPress = () => {
    // TODO: Detect if enter was pressed
  }

  handleForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { name } = this.state.formControls;
		console.log(name);
		
		this.props.handleSubmit({ name: name.value });
  }

  handleChange = (event: any): void => {
    const name: keyof IFormControls = event.target.name;
    const value = event.target.value;

    const updatedControls = {
      ...this.state.formControls
    };

    let updatedControl = updatedControls[name];

    updatedControl.value = value;
    updatedControl.touched = true;
    updatedControl.valid = validate(value, updatedControl.validationRules);

    this.setState({
      formControls: updatedControls
    });
  }

  handleKeyPress = () => {
    // TODO: Detect if enter was pressed
  }

  handleForm = (event: any) => {
    event.preventDefault();
    const { name, email, phone } = this.state.formControls;
    console.log(name.value);

    this.props.changeHandler(name.value);
  }



  render() {
    const { name, email, phone } = this.state.formControls;

    return (
      <form onSubmit={(e) => this.handleForm(e)} onKeyPress={this.handleKeyPress}>

        <FormTextControl
          name="name"
          htmlFor="name"
          onChange={this.handleChange}
          value={name.value}
          id="name"
          label="Name: "
          touched={name.touched ? 1 : 0}
          valid={name.valid ? 1 : 0}
          error={"Field is required"}
        />

        {/* <FormTextControl
          name="email"
          htmlFor="email"
          onChange={this.handleChange}
          value={email.value}
          id="email"
          label="Email: "
          touched={email.touched}
          valid={email.valid}
          error={"Please enter a valid email-address"}
        />

        <FormTextControl
          name="phone"
          htmlFor="phone"
          onChange={this.handleChange}
          value={phone.value}
          id="phone"
          label="Phone Number: "
          touched={phone.touched}
          valid={phone.valid}
          error={"Please enter only digits"}
        /> */}

        <button type="submit">Confirm</button>

      </form>
    );
  }

}