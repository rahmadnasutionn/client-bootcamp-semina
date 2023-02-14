import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Dashboard = lazy(() => import('../pages/dashboard'));

export function HomeRouter() {
    return (
        <Routes>
            <Route path='/' element={
                <Suspense fallback={ <div>Loading ...</div> }>
                    <Dashboard />
                </Suspense>
            } />
        </Routes>
    )
}