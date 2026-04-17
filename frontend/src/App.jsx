import React, { lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProtectedRoute from './routes/ProtectedRoute';
import LazyPage from './routes/LazyPage';
import NotFound from './pages/NotFound';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const DashboardOverview = lazy(() => import('./pages/dashboard/Overview'));
const DashboardOrders = lazy(() => import('./pages/dashboard/Orders'));
const DashboardProfile = lazy(() => import('./pages/dashboard/Profile'));
const Login = lazy(() => import('./pages/Login'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LazyPage Component={Home} />} />
        <Route path="/shop" element={<LazyPage Component={Shop} />} />
        <Route path="/products/:slug" element={<LazyPage Component={ProductDetail} />} />
        <Route path="/login" element={<LazyPage Component={Login} />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route element={<LazyPage Component={Dashboard} />}>
            <Route index element={<LazyPage Component={DashboardOverview} />} />
            <Route path="orders" element={<LazyPage Component={DashboardOrders} />} />
            <Route path="profile" element={<LazyPage Component={DashboardProfile} />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;