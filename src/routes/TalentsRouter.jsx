import React from 'react'
import { Route, Routes } from 'react-router-dom'

import TalentsPage from '../pages/talents'
import TalentsCreate from '../pages/talents/create'
import TalentsEdit from '../pages/talents/edit'

export default function TalentsRouter() {
  return (
    <Routes>
        <Route path='/' element={ <TalentsPage /> } />
        <Route path='/create' element={ <TalentsCreate /> } />
        <Route path='/edit/:talentId' element={ <TalentsEdit /> } />
    </Routes>
  )
}
