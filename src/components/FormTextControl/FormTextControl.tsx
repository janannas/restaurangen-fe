import React from 'react';

interface IProps {
  name: string;
  htmlFor: string;
  value: string;
  id: string;
  label: string;
  onChange: any;
}

export const FormTextControl = (props: IProps) => {
  const { htmlFor, label } = props;

  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      <input {...props} />
    </div>
  )
}

