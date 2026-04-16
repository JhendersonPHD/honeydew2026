"use client";

import React, { useState } from 'react';

const initialWidgets = [
  { id: 'stats', title: 'Quick Stats', type: 'stats' },
  { id: 'activity', title: 'Recent Activity', type: 'activity' },
  { id: 'inventory', title: 'Low Stock Alerts', type: 'list' }
];

export default function WidgetDashboard() {
  const [widgets, setWidgets] = useState(initialWidgets);
  const [draggedWidget, setDraggedWidget] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedWidget(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedWidget === null || draggedWidget === index) return;

    const newWidgets = [...widgets];
    const draggedItem = newWidgets[draggedWidget];
    newWidgets.splice(draggedWidget, 1);
    newWidgets.splice(index, 0, draggedItem);

    setWidgets(newWidgets);
    setDraggedWidget(index);
  };

  const handleDragEnd = () => {
    setDraggedWidget(null);
  };

  const renderWidgetContent = (type) => {
    switch(type) {
      case 'stats':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Total Sales</p>
              <p className="text-2xl font-bold text-gray-800">$12,450</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Orders</p>
              <p className="text-2xl font-bold text-gray-800">145</p>
            </div>
          </div>
        );
      case 'activity':
        return (
          <ul className="space-y-3">
            {[
              { id: 1, text: 'New order #4492 placed', time: '5m ago' },
              { id: 2, text: 'Inventory updated for "Summer T-Shirt"', time: '1h ago' },
              { id: 3, text: 'Refund processed for order #4480', time: '3h ago' }
            ].map(item => (
              <li key={item.id} className="flex justify-between items-center text-sm border-b pb-2 last:border-0 last:pb-0">
                <span className="text-gray-700">{item.text}</span>
                <span className="text-gray-400 text-xs">{item.time}</span>
              </li>
            ))}
          </ul>
        );
      case 'list':
        return (
          <ul className="space-y-2">
            {[
              { id: 1, name: 'Wireless Earbuds', stock: 3 },
              { id: 2, name: 'Phone Case - Black', stock: 1 },
              { id: 3, name: 'USB-C Cable', stock: 5 }
            ].map(item => (
              <li key={item.id} className="flex justify-between items-center bg-red-50 p-2 rounded text-sm">
                <span className="font-medium text-gray-800">{item.name}</span>
                <span className="text-red-600 font-bold">{item.stock} left</span>
              </li>
            ))}
          </ul>
        );
      default:
        return <div>Unknown widget type</div>;
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-xl min-h-[500px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Dashboard</h2>
        <button className="text-sm bg-white border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors shadow-sm font-medium text-gray-700">
          + Add Widget
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgets.map((widget, index) => (
          <div
            key={widget.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`bg-white rounded-xl shadow-sm border border-gray-200 p-5 cursor-move transition-all ${draggedWidget === index ? 'opacity-50 scale-95' : 'opacity-100 hover:shadow-md'}`}
          >
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 cursor-grab" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {widget.title}
              </h3>
              <button className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
            {renderWidgetContent(widget.type)}
          </div>
        ))}
      </div>
    </div>
  );
}
