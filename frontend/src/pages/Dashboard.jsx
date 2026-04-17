import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md font-medium transition-colors ${
    isActive
      ? 'bg-emerald-100 text-emerald-800'
      : 'text-emerald-600 hover:bg-emerald-50 hover:text-emerald-800'
  }`;

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <Breadcrumbs />
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <nav className="mb-8 border-b pb-4">
        <ul className="flex space-x-2">
          <li>
            <NavLink to="/dashboard" end className={navLinkClass}>Overview</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/orders" className={navLinkClass}>My Orders</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile" className={navLinkClass}>Profile</NavLink>
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