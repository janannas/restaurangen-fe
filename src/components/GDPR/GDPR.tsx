import React from 'react';
import { validate } from '../../utils/validation';

interface IGDPRProps {
  GDPRMessage: string;
  handleGDPRChange(input: boolean): void;
}

interface IGDPRState {
  isGDPRChecked: boolean;
  formControl: {
    touched: boolean;
    valid: boolean;
    validationRules: {
      isChecked: boolean;
    }
    error: string;
  }
}

export class GDPR extends React.Component<IGDPRProps, IGDPRState> {
  constructor(props: IGDPRProps) {
    super(props);

    this.state = {
      isGDPRChecked: false,
      formControl: {
        touched: false,
        valid: false,
        validationRules: {
          isChecked: true
        },
        error: "Agreeing is required"
      }
    }
  }

  validateControl = (checkBoxValue: boolean) => {
    let updatedControl = { ...this.state.formControl };

    updatedControl.touched = true;
    updatedControl.valid = validate(checkBoxValue, updatedControl.validationRules);

    this.setState({ formControl: updatedControl });
  }

  handleChange = (event: any): void => {
    const checkBoxChecked = event.target.checked;
    let value: boolean;

    checkBoxChecked ? value = true : value = false;

    this.setState({
      isGDPRChecked: value
    });

    this.props.handleGDPRChange(value);

    this.validateControl(checkBoxChecked);
  }

  render() {
    const { touched, valid, error } = this.state.formControl;
    const { isGDPRChecked } = this.state;
    const { GDPRMessage } = this.props;

    return (
      <>
        <div className="container w-80 GDPR-message">
          <p>{GDPRMessage}</p>
        </div>

        <div className="text-left w-100">
          <label htmlFor="GDPRCheckBox" className="GDPR-label">
            <input
              type="checkbox"
              name="GDPRCheckBox"
              id="GDPRCheckBox"
              checked={isGDPRChecked}
              onChange={this.handleChange}
            />
            Click here to agree
          </label>


          <div className="form-control-error">
            {touched && !valid ? <small>{error}</small> : null}
          </div>
        </div>
      </>
    );
  }
}