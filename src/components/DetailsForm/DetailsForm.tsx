import React from 'react';
import { FormTextControl } from "../FormTextControl/FormTextControl";

interface IProps {
  handleForm: any;
  handleKeyPress: any;
  nameValue: string;
  nametouched: any;
  namevalid: any;
  emailValue: string;
  phoneValue: string
  handleChange: any;
}

export const DetailsForm = ({
  handleForm,
  nameValue,
  handleChange,
  nametouched,
  namevalid
}: IProps) => {

  return (
    <form onSubmit={handleForm}>

      <FormTextControl
        name="name"
        htmlFor="name"
        onChange={handleChange}
        value={nameValue}
        id="name"
        label="Name: "
        touched={nametouched}
        valid={namevalid}
        error={"Field is required"}
      />

      {/*  <FormTextControl
        name="email"
        htmlFor="email"
        onChange={handleChange}
        value={emailValue}
        id="email"
        label="Email: "
        touched=
        valid=
        error={"required"}
      />

      <FormTextControl
        name="phone"
        htmlFor="phone"
        onChange={handleChange}
        value={phoneValue}
        id="phone"
        label="Phone Number: "
        touched=
        valid=
        error={"required"}
      /> */}

      <button type="submit">Confirm</button>

    </form>
  );


}