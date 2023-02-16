import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PaymentsPage from '../pages/payments'
import PaymentsCreate from '../pages/payments/create'
import PaymentsEdit from '../pages/payments/edit'


export default function PaymentsRoute() {
  return (
    <Routes>
        <Route path='/' element={ <PaymentsPage /> } />
        <Route path='/create' element={ <PaymentsCreate /> } />
        <Route path='/edit/:paymentId' element={ <PaymentsEdit /> } />
    </Routes>
  )
}
