'use client';

import { useEffect } from 'react';
import { useAnalytics } from '@/contexts/AnalyticsContext';

export default function AnalyticsPage() {
  const { summary, topProducts, isLoading, error, fetchAll } = useAnalytics();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  if (isLoading) return <div>Loading analytics...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Sales Analytics</h1>

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
            <p className="text-3xl font-bold">${summary.totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
            <p className="text-3xl font-bold">{summary.totalOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Avg Order Value</h3>
            <p className="text-3xl font-bold">${summary.averageOrderValue.toFixed(2)}</p>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold mb-4">Top Products</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {topProducts.map(product => (
              <li key={product.id} className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  {product.images && product.images[0] && (
                    <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded mr-4" />
                  )}
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-gray-500">{product.category?.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${product.price}</p>
                </div>
              </li>
            ))}
            {topProducts.length === 0 && <li className="p-4 text-gray-500">No products found.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}