import React from 'react';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  background: '#1a1a1a',
  color: '#fff',
};
const headingStyle = {
  fontSize: 120,
  fontWeight: 700,
  margin: 0,
  color: '#fff',
  textShadow: '0 2px 10px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease',
};
const textStyle = {
  fontSize: 24,
  margin: '20px 0',
  color: '#ccc',
};
const btnStyle = {
  background: '#fff',
  color: '#000',
  border: 'none',
  borderRadius: 6,
  padding: '12px 24px',
  fontSize: 18,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
};

function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>404</h1>
      <p style={textStyle}>Oops! The page you're looking for doesn't exist.</p>
      <button onClick={() => navigate('/')} style={btnStyle}>Go Home</button>
    </div>
  );
}

export default NotFound; 