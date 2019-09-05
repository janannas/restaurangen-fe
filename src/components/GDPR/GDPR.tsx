import React from 'react';

interface IGDPRProps {
  GDPRMessage: string;
  handleGDPRChange(input: boolean): void;
}

interface IGDPRState {
  isGDPRChecked: boolean;
}

export class GDPR extends React.Component<IGDPRProps, IGDPRState> {
  constructor(props: IGDPRProps) {
    super(props);

    this.state = {
      isGDPRChecked: false
    }
  }

  handleInputChange = (event: any): void => {
    const checkBoxChecked = event.target.checked;
    let value: boolean;

    checkBoxChecked ? value = true : value = false;

    this.setState({
      isGDPRChecked: value
    });

    this.props.handleGDPRChange(value);
  }

  render() {
    const { GDPRMessage } = this.props;
    const { isGDPRChecked } = this.state;

    return (
      <>
        <div>
          <input
            type="checkbox"
            name="GDPRCheckBox"
            checked={isGDPRChecked}
            onChange={this.handleInputChange}
          />
        </div>
        <p>{GDPRMessage}</p>
      </>
    );
  }
}