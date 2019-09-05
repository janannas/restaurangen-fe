import React from 'react';

import { FormTextControl } from "../FormTextControl/FormTextControl";
import { validate } from '../../utils/validation';
import { IDetails } from '../Booking/Booking';

interface IFormDetailsProps {
  handleDetailSubmit(details: IDetails): void;
}

interface IFormDetailsState {
  formIsValid: boolean;
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

export class FormDetails extends React.Component<IFormDetailsProps, IFormDetailsState> {
  constructor(props: IFormDetailsProps) {
    super(props);

    this.state = {
      formIsValid: false, //track the overall form validity

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
    }
  }

  handleKeyPress = (event: React.KeyboardEvent): void => {
    if (event.nativeEvent.keyCode === 13) {
      if (this.state.formIsValid) {
        this.onFormSubmit(event);
      }
    }
  }

  onFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const {
      name,
      email,
      phone
    } = this.state.formControls;

    this.props.handleDetailSubmit({
      name: name.value,
      email: email.value,
      phone: phone.value
    });
  }

  validateForm = () => {
    const updatedControls = {
      ...this.state.formControls
    };

    // temp object to set state
    let formIsValid: boolean = true;
    let inputIdentifier: keyof IFormDetailsState["formControls"];

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
    const name: keyof IFormDetailsState["formControls"] = event.target.name;

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

  handleChange = (event: any): void => {
    const name: keyof IFormDetailsState["formControls"] = event.target.name;
    const value = event.target.value;

    const updatedControls = {
      ...this.state.formControls
    };

    let updatedControl = updatedControls[name];

    updatedControl.value = value;

    // Don't want to validate on every keyStroke but still validate 
    // as soon as formControl as valid, not only onBlur
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

  render() {
    const { name, email, phone } = this.state.formControls;

    return (
      <form onSubmit={(e) => this.onFormSubmit(e)} onKeyPress={this.handleKeyPress}>

        <FormTextControl
          name="name"
          htmlFor="name"
          onChange={this.handleChange}
          onBlur={this.triggerAllValidation}
          value={name.value}
          id="name"
          label="Name: "
          touched={name.touched ? 1 : 0}
          valid={name.valid ? 1 : 0}
          error={"Field is required"}
        />

        <FormTextControl
          name="email"
          htmlFor="email"
          onChange={this.handleChange}
          onBlur={this.triggerAllValidation}
          value={email.value}
          id="email"
          label="Email: "
          touched={email.touched ? 1 : 0}
          valid={email.valid ? 1 : 0}
          error={"Please enter a valid email-address"}
        />

        <FormTextControl
          name="phone"
          htmlFor="phone"
          onChange={this.handleChange}
          onBlur={this.triggerAllValidation}
          value={phone.value}
          id="phone"
          label="Phone Number: "
          touched={phone.touched ? 1 : 0}
          valid={phone.valid ? 1 : 0}
          error={"Please enter at least three digits"}
        />

        <button type="submit" disabled={!this.state.formIsValid}>Confirm</button>

      </form>
    );
  }

}