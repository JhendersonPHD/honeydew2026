import React, { useState } from 'react';

export const requestPushPermission = async () => {
  console.log('[Push Notifications] Requesting permission...');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('granted'); // Mocking permission grant
    }, 500);
  });
};

function PushNotifications() {
  const [status, setStatus] = useState('default');

  const handleRequest = async () => {
    const result = await requestPushPermission();
    setStatus(result);
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px', margin: '1rem 0' }}>
      <h3>Push Notifications</h3>
      <p>Status: {status}</p>
      <button onClick={handleRequest}>Request Permission</button>
    </div>
  );
}

export default PushNotifications;
