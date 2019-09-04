import React from 'react';

interface IProps {
  msg: string;
}

export const GDPR = ({ msg }: IProps) => {
  return (
    <>
      <h2>GDPR works!</h2>
      <p>{msg}</p>
    </>
  );
}