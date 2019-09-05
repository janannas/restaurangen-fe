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
        error: "Checkbox is required"
      }
    }
  }

  validateInput = (event: any) => {
    let updatedControl = { ...this.state.formControl };

    updatedControl.touched = true;
    updatedControl.valid = validate(event.target.checked, updatedControl.validationRules);

    this.setState({ formControl: updatedControl });
  }

  handleInputChange = (event: any): void => {
    const checkBoxChecked = event.target.checked;
    let value: boolean;

    checkBoxChecked ? value = true : value = false;

    this.setState({
      isGDPRChecked: value
    });

    this.props.handleGDPRChange(value);

    this.validateInput(event);
  }

  render() {
    const { touched, valid, error } = this.state.formControl;
    const { isGDPRChecked } = this.state;
    const { GDPRMessage } = this.props;

    return (
      <>
        <div>
          <input
            type="checkbox"
            name="GDPRCheckBox"
            id="GDPRCheckBox"
            checked={isGDPRChecked}
            onChange={this.handleInputChange}
          />
        </div>

        <div style={{ height: "20px" }}>
          {touched && !valid ? <small>{error}</small> : null}
        </div>

        <p>{GDPRMessage}</p>
      </>
    );
  }
}