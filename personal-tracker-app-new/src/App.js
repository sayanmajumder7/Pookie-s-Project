import React, { useEffect, useState } from 'react';
import { testBackendConnection } from './services/api';

function App() {
  const [backendStatus, setBackendStatus] = useState('Checking connection...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await testBackendConnection();
        setBackendStatus(`Backend connected! Message: ${response.message}`);
        setError(null);
      } catch (error) {
        setBackendStatus('Failed to connect to backend');
        setError(error.message);
      }
    };

    checkBackend();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Personal Tracker App</h1>
      <div style={{ 
        padding: '20px', 
        border: '1px solid #ccc', 
        borderRadius: '5px',
        marginTop: '20px'
      }}>
        <h2>Backend Status:</h2>
        <p>{backendStatus}</p>
        {error && (
          <p style={{ color: 'red' }}>
            Error: {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default App; 