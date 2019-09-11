import React from 'react';

import { validate } from '../../utils/validation';
import { IDetails } from '../Booking/Booking';

import FormTextControl from "../FormTextControl/FormTextControl";
import { GDPR } from "../GDPR/GDPR";

interface IFormDetailsProps {
  handleDetailSubmit(details: IDetails): void;
  GDPRMessage: string;
}

interface IFormDetailsState {
  formIsValid: boolean;
  isGDPRChecked: boolean;

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

class FormDetails extends React.Component<IFormDetailsProps, IFormDetailsState> {
  constructor(props: IFormDetailsProps) {
    super(props);

    this.state = {
      formIsValid: false, //track the overall form validity
      isGDPRChecked: false,

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

  handleGDPRChange = (GDPRValue: boolean) => {
    this.setState({ isGDPRChecked: GDPRValue })
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

  render() {
    const { name, email, phone } = this.state.formControls;
    const { formIsValid, isGDPRChecked } = this.state;
    const { GDPRMessage } = this.props;

    return (
      <form className="form-details w-100 justify-content-center" onSubmit={(e) => this.onFormSubmit(e)} onKeyPress={this.handleKeyPress}>

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

        <GDPR GDPRMessage={GDPRMessage} handleGDPRChange={this.handleGDPRChange} />

        <button type="submit" className="submit-form-button btn" disabled={!formIsValid || !isGDPRChecked}>BOOK NOW</button>

      </form>
    );
  }

}

export default FormDetails;