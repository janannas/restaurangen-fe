import React from 'react';

interface IProps {
  htmlFor: string;
  label: string;
  // attr touched & valid, does not accept boolean values, this is a work around
  touched: number;
  valid: number;
  error: string;
  name: string;
  value: string;
  id: string;
  onChange: any;
}

export const FormTextControl = (props: IProps) => {
  const {
    htmlFor,
    label,
    touched,
    valid,
    error
  } = props;

  return (
    <>
      <div>
        <label htmlFor={htmlFor}>{label}</label>
        <input {...props} />
      </div>

      <div style={{ height: "20px" }}>
        {touched && !valid ? <small>{error}</small> : null}
      </div>
    </>
  )
}

