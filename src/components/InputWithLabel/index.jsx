import React from 'react';
import { Form } from 'react-bootstrap';
import Input from '../Input';

function InputWithLabel({
  label,
  name,
  value,
  type,
  onChange,
  placeholder,
}) {
  return (
    <Form.Group className='mb-2'>
      <Form.Label>{label}</Form.Label>
      <Input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Form.Group>
  );
}

export default InputWithLabel;