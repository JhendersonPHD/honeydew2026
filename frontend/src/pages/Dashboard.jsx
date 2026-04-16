import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <Breadcrumbs />
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <nav className="mb-8 border-b pb-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/dashboard" className="text-emerald-600 hover:text-emerald-800">Overview</Link>
          </li>
          <li>
            <Link to="/dashboard/orders" className="text-emerald-600 hover:text-emerald-800">My Orders</Link>
          </li>
          <li>
            <Link to="/dashboard/profile" className="text-emerald-600 hover:text-emerald-800">Profile</Link>
          </li>
        </ul>
      </nav>
      <div className="bg-white p-6 rounded shadow">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;