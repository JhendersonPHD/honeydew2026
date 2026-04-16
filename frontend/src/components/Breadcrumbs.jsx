import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="text-sm mb-4" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex items-center text-gray-500">
        <li className="flex items-center">
          <Link to="/" className="hover:text-emerald-600 transition-colors">
            Home
          </Link>
          {pathnames.length > 0 && <span className="mx-2">/</span>}
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const formattedName = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');

          return isLast ? (
            <li key={name} className="text-gray-800 font-medium" aria-current="page">
              {formattedName}
            </li>
          ) : (
            <li key={name} className="flex items-center">
              <Link to={routeTo} className="hover:text-emerald-600 transition-colors">
                {formattedName}
              </Link>
              <span className="mx-2">/</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;