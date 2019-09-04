import React from 'react';

import { FormTextControl } from "../FormTextControl/FormTextControl";
import { validate } from '../../utils/validation';
import { IDetails } from '../Booking/Booking';

interface IDetailsFormProps {
  handleSubmit(details: IDetails): void;
}

interface IDetailsFormState {
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
        isRequired: boolean;
        isEmail: boolean;
      };
    };
    phone: {
      value: string;
      valid: boolean;
      touched: boolean;
      validationRules: {
        isRequired: boolean;
        isNumber: boolean;
        minLength: number;
      };
    };
  };
  error: string;
}

export class DetailsForm extends React.Component<IDetailsFormProps, IDetailsFormState> {
  constructor(props: IDetailsFormProps) {
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
            isRequired: true,
            isEmail: true
          }
        },
        phone: {
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true,
            isNumber: true,
            minLength: 5
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

  validateForm = () => {
    // const name: keyof IDetailsFormState["formControls"] = event.target.name;

    const updatedControls = {
      ...this.state.formControls
    };

    // temp object to set state
    let formIsValid: boolean = true;
    let inputIdentifier: keyof IDetailsFormState["formControls"];

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
    const name: keyof IDetailsFormState["formControls"] = event.target.name;

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

  handleChange = (event: any): void => {
    const name: keyof IDetailsFormState["formControls"] = event.target.name;
    const value = event.target.value;

    const updatedControls = {
      ...this.state.formControls
    };

    let updatedControl = updatedControls[name];

    updatedControl.value = value;

    let formIsValid: boolean = false;

    // validate again, otherwise will only validate on blur
    if (updatedControl.touched) {
      updatedControl.valid = validate(value, updatedControl.validationRules);
      formIsValid = this.validateForm();
    }

    this.setState({
      formIsValid: formIsValid,
      formControls: updatedControls
    });
  }

  render() {
    const { name, email, phone } = this.state.formControls;

    return (
      <form onSubmit={(e) => this.handleForm(e)} onKeyPress={this.handleKeyPress}>

        <FormTextControl
          name="name"
          htmlFor="name"
          onChange={this.handleChange}
          onBlur={this.validateControl}
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
          onBlur={this.validateControl}
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
          onBlur={this.validateControl}
          value={phone.value}
          id="phone"
          label="Phone Number: "
          touched={phone.touched ? 1 : 0}
          valid={phone.valid ? 1 : 0}
          error={"Please enter minimum 5 digits"}
        />

        <button type="submit" disabled={!this.state.formIsValid}>Confirm</button>

      </form>
    );
  }

}