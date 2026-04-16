'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardLayout({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading dashboard...</div>;
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Placeholder */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 text-xl font-bold border-b">HoneyDew Admin</div>
        <nav className="p-4 space-y-2">
          <Link href="/analytics" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Analytics</Link>
          <Link href="/inventory" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Inventory</Link>
          <Link href="/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Products</Link>
          <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Settings</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm h-16 flex items-center px-6">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}