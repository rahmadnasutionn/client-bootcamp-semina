import React from 'react'
import { Alert } from 'react-bootstrap'

export default function SAlert({ type, message }) {
  return (
    <Alert variant={type}>{message}</Alert>
  )
}
