import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EventPage from '../pages/events'
import EventCreate from '../pages/events/create'
import EventEdit from '../pages/events/edit'

export default function EventsRoute() {
  return (
    <Routes>
        <Route path='/' element={ <EventPage /> } />
        <Route path='/create' element={ <EventCreate /> } />
        <Route path='/edit/:eventId' element={ <EventEdit /> } />
    </Routes>
  )
}
