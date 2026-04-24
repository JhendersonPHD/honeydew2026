import React, { useEffect } from 'react';
import { usePageTracking } from './Analytics';
import PushNotifications from './PushNotifications';

function Dashboard() {
  usePageTracking('EngagementDashboard');

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Engagement Metrics Dashboard</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
        <div style={{ padding: '1.5rem', background: '#FFFBEB', borderRadius: '8px', border: '1px solid #F59E0B' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#1F2937' }}>Daily Active Users</h3>
          <p style={{ fontSize: '2rem', margin: 0, color: '#F59E0B', fontWeight: 'bold' }}>1,245</p>
        </div>

        <div style={{ padding: '1.5rem', background: '#ecfdf5', borderRadius: '8px', border: '1px solid #10B981' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#1F2937' }}>Conversion Rate</h3>
          <p style={{ fontSize: '2rem', margin: 0, color: '#10B981', fontWeight: 'bold' }}>4.2%</p>
        </div>

        <div style={{ padding: '1.5rem', background: '#eef2ff', borderRadius: '8px', border: '1px solid #6366F1' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#1F2937' }}>Referrals Sent</h3>
          <p style={{ fontSize: '2rem', margin: 0, color: '#6366F1', fontWeight: 'bold' }}>328</p>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <PushNotifications />
      </div>
    </div>
  );
}

export default Dashboard;
