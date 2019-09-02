import React from 'react';
import { FormTextControl } from "../FormTextControl/FormTextControl";

interface IProps {
  handleForm: any;
  handleKeyPress: any;
  handleChange: any;
  nameValue: string;
  emailValue: string;
  phoneValue: string
}

export const DetailsForm = ({
  handleForm,
  handleKeyPress,
  handleChange,
  nameValue,
  emailValue,
  phoneValue
}: IProps) => {

  return (
    <form onSubmit={handleForm} onKeyPress={handleKeyPress}>

      <FormTextControl
        name="name"
        htmlFor="name"
        onChange={handleChange}
        value={nameValue}
        id="name"
        label="Name: "
      />

      <FormTextControl
        name="email"
        htmlFor="email"
        onChange={handleChange}
        value={emailValue}
        id="email"
        label="Email: "
      />

      <FormTextControl
        name="phone"
        htmlFor="phone"
        onChange={handleChange}
        value={phoneValue}
        id="phone"
        label="Phone Number: "
      />

      <button type="submit">Confirm</button>

    </form>
  );
}