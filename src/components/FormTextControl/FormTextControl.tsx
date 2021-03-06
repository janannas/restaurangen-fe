import React from 'react';

interface IFormTextControlProps {
  htmlFor: string;
	label: string;
  touched: boolean | number;
  valid: boolean | number;
  error: string;
  name: string;
  value: string;
  id: string;
  onChange: any;
  onBlur: any;
}

const FormTextControl = (props: IFormTextControlProps) => {
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
        <label className="text-labels" htmlFor={htmlFor}>{label}</label>
        <input className="form-control" placeholder={label} {...props} />
      </div>

      <div className="form-control-error">
        {touched && !valid ? <small role="alert">{error}</small> : null}
      </div>
    </>
  )
}

export default FormTextControl;