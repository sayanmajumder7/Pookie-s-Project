import React from 'react';
import styled from '@emotion/styled';

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeIn 0.8s ease-out;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 42rem;
  margin: 0 auto;
`;

const Hero = () => {
  return (
    <HeroSection>
      <Title>Your Wellness Journey Starts Here</Title>
      <Description>
        Track your daily habits, join challenges, and unlock your potential with our premium wellness platform
      </Description>
    </HeroSection>
  );
};

export default Hero; 