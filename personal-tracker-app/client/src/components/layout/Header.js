import React from 'react';
import styled from '@emotion/styled';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  animation: slideUp 0.6s ease-out;
`;

const Nav = styled.nav`
  max-width: 6xl;
  margin: 0 auto;
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: glow 2s ease-in-out infinite alternate;
`;

const ThemeToggle = styled.button`
  background: rgba(255, 255, 255, 0.25);
  border: none;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const Header = ({ darkMode, toggleTheme }) => {
  return (
    <HeaderContainer>
      <Nav>
        <Logo>WellTrack</Logo>
        <ThemeToggle onClick={toggleTheme}>
          <span>{darkMode ? '☀️' : '🌙'}</span>
          <span>{darkMode ? 'Light' : 'Dark'}</span>
        </ThemeToggle>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 