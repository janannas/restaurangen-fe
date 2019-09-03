import React from 'react';

interface IProps {
  name: string;
  htmlFor: string;
  value: string;
  id: string;
  label: string;
  touched: boolean;
  valid: boolean;
  error: string;
  onChange: any;
}

export const FormTextControl = (props: IProps) => {
  const { htmlFor, label, touched, valid, error } = props;

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

