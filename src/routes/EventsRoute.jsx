import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EventPage from '../pages/events'

export default function EventsRoute() {
  return (
    <Routes>
        <Route path='/' element={ <EventPage /> } />
    </Routes>
  )
}
