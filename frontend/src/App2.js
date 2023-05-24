import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const App2 = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if username and password match the credentials
    if (username === 'work' && password === 'work16') {
      // Redirect to another page on successful login
      navigate('/addwork');
    } else {
      // Show error message for invalid credentials
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ background: 'black', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Login Page</h1>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ color: 'white' }}>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '5px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ color: 'white' }}>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '5px' }} />
          </div>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default App2;
