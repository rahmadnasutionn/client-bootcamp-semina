import React from 'react'
import { Route, Routes } from 'react-router-dom'
import OrderPage from '../pages/orders'

export default function OrderRoute() {
  return (
    <Routes>
        <Route path='/' element={ <OrderPage /> } />
    </Routes>
  )
}
