import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cardStyle = {
  background: '#1a1a1a',
  borderRadius: 16,
  boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
  padding: 36,
  maxWidth: 400,
  margin: '80px auto',
  color: '#fff',
  transition: 'transform 0.3s ease',
};
const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  margin: '10px 0',
  borderRadius: 6,
  border: '1px solid #ccc',
  fontSize: 16,
  background: '#fff',
  color: '#000',
};
const btnStyle = {
  width: '100%',
  background: '#fff',
  color: '#000',
  border: 'none',
  borderRadius: 6,
  padding: '12px 0',
  fontWeight: 600,
  fontSize: 17,
  marginTop: 10,
  cursor: 'pointer',
};
const welcomeStyle = {
  fontSize: 18,
  color: '#ccc',
  textAlign: 'center',
  marginBottom: 24,
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: 24 }}>Login</h2>
      <p style={welcomeStyle}>Welcome back! Please log in to continue.</p>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
        <button type="submit" style={btnStyle}>Login</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
      <p style={{ marginTop: 18, textAlign: 'center' }}>Don't have an account? <a href="/register" style={{ color: '#fff' }}>Register</a></p>
    </div>
  );
}

export default Login; 