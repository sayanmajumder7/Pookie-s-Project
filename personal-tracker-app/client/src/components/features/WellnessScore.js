import React from 'react';
import styled from '@emotion/styled';

const Card = styled.div`
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  animation: slideUp 0.6s ease-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ScoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const ScoreRing = styled.div`
  width: 12rem;
  height: 12rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScoreCircle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    var(--teal-400) 0deg ${props => (props.score / 100) * 360}deg,
    rgba(255, 255, 255, 0.1) ${props => (props.score / 100) * 360}deg 360deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScoreInner = styled.div`
  width: 9rem;
  height: 9rem;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Score = styled.div`
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--teal-500);
  margin-bottom: 0.25rem;
`;

const ScoreLabel = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const Message = styled.p`
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const WellnessScore = ({ score, getScoreLabel }) => {
  return (
    <Card>
      <Title>Today's Wellness Score</Title>
      
      <ScoreContainer>
        <ScoreRing>
          <ScoreCircle score={score}>
            <ScoreInner>
              <Score>{score}</Score>
              <ScoreLabel>{getScoreLabel(score)}</ScoreLabel>
            </ScoreInner>
          </ScoreCircle>
        </ScoreRing>
      </ScoreContainer>
      
      <Message>🎯 Keep up the great work!</Message>
    </Card>
  );
};

export default WellnessScore; 