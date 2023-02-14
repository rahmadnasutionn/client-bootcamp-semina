import React from 'react';
import { Form } from 'react-bootstrap';

function Input({ name, value, type, onChange, placeholder }) {
  return (
    <Form.Control
      type={type}
      name={name}
      value={value} // state
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default Input;