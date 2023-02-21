import { Navigate, Route, Routes } from 'react-router-dom';
import GuardRoute from '../components/GuardRoute';
import GuestOnlyRoute from '../components/GuestOnlyRoute';

import Signin from '../pages/signin';
import { CategoriesRoute } from './CategoriesRoute';
import PaymentsRoute from './PaymentsRoute';
import SNavbar from '../components/Navbar';
import { HomeRouter } from './HomeRouter';
import TalentsRouter from './TalentsRouter';
import EventsRoute from './EventsRoute';
import OrderRoute from './OrderRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path='login'
        element={
          <GuestOnlyRoute>
            <Signin />
          </GuestOnlyRoute>
        }
      />
      <Route
        path='/'
        element={
          <>
            <SNavbar />
            <GuardRoute />
          </>
        }
      >
        <Route path='dashboard/*' element={<HomeRouter />} />
        <Route path='categories/*' element={<CategoriesRoute />} />
        <Route path='talents/*' element={<TalentsRouter />} />
         <Route path='payments/*' element={<PaymentsRoute />} /> 
        <Route path='events/*' element={<EventsRoute />} />
        <Route path='orders/*' element={<OrderRoute />} /> 
        <Route path='' element={<Navigate to='/dashboard' replace={true} />} />
      </Route>
    </Routes>
  );
}