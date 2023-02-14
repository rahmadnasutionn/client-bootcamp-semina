import React from 'react'
import { Form } from 'react-bootstrap'

export default function SearchInput({
    disabled,
    query,
    handleChange,
    placeholder
}) {
  return (
    <Form.Group className='mb-3'>
        <Form.Control
        disabled={disabled}
        name='query'
        value={query}
        onChange={handleChange}
        placeholder={placeholder}>
        </Form.Control>
    </Form.Group>
  )
}
