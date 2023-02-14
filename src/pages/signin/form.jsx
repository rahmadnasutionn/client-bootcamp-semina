import React from 'react'
import InputWithLabel from '../../components/InputWithLabel'
import SButton from '../../components/Button'

import { Form } from 'react-bootstrap';

export default function SForm({ form, handleSubmit, handleChange, isLoading }) {
  return (
    <Form>
        <InputWithLabel label="Email" type='email' name='email' placeholder='Enter your email' value={form.email} onChange={handleChange} />
        <InputWithLabel label="Password" type='password' name='password' placeholder='Enter your email' value={form.password} onChange={handleChange} />
         <SButton loading={isLoading} disabled={isLoading} variant='primary' size='sm' action={handleSubmit}>
            Submit
         </SButton>
    </Form>
  )
}
