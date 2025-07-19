import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState<string>('');
  const [health, setHealth] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchHello = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/hello');
      const data = await response.text();
      setMessage(data);
    } catch (error) {
      setMessage('Error connecting to backend');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHealth = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/health');
      const data = await response.text();
      setHealth(data);
    } catch (error) {
      setHealth('Backend is not available');
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dojeon Project</h1>
        <p>React TypeScript + Spring Boot</p>
        
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={fetchHello}
            disabled={loading}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Loading...' : 'Call Backend API'}
          </button>
        </div>

        {message && (
          <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
            <strong>Backend Response:</strong> {message}
          </div>
        )}

        {health && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '5px' }}>
            <strong>Health Check:</strong> {health}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
