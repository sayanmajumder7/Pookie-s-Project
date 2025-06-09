import React from 'react';
import styled from '@emotion/styled';

const Card = styled.div`
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2d3748;
`;

const ChallengeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ChallengeCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ChallengeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ChallengeIcon = styled.span`
  font-size: 2rem;
`;

const ChallengeTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`;

const ChallengeDescription = styled.p`
  color: #4a5568;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(to right, var(--indigo-500), var(--purple-600));
  border-radius: 0.25rem;
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
`;

const ChallengeButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border-radius: 1.5rem;
  font-weight: 500;
  font-size: 1rem;
  background: linear-gradient(to right, rgba(79,70,229,0.7), rgba(124,58,237,0.7));
  color: #fff;
  border: 1.5px solid rgba(255,255,255,0.25);
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 24px rgba(79, 70, 229, 0.10);
  backdrop-filter: blur(8px);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(79, 70, 229, 0.18);
  }
`;

const ActiveChallenges = ({ challenges = [] }) => {
  // Default challenges if none are provided
  const defaultChallenges = [
    {
      id: 1,
      title: '7-Day Hydration Boost',
      icon: '💧',
      description: 'Drink 8 glasses of water daily for a week',
      progress: 71,
      currentDay: 5,
      totalDays: 7,
      active: true
    },
    {
      id: 2,
      title: 'Daily Walk Challenge',
      icon: '🚶‍♀️',
      description: 'Take a 30-minute walk every day this month',
      progress: 45,
      currentDay: 14,
      totalDays: 30,
      active: false
    }
  ];

  const displayChallenges = Array.isArray(challenges) && challenges.length > 0 ? challenges : defaultChallenges;

  return (
    <Card>
      <Title>Active Challenges</Title>
      <ChallengeList>
        {displayChallenges.map(challenge => (
          <ChallengeCard key={challenge.id}>
            <ChallengeHeader>
              <ChallengeIcon>{challenge.icon}</ChallengeIcon>
              <ChallengeTitle>{challenge.title}</ChallengeTitle>
            </ChallengeHeader>
            <ChallengeDescription>{challenge.description}</ChallengeDescription>
            <ProgressBar>
              <ProgressFill progress={challenge.progress} />
            </ProgressBar>
            <ChallengeButton>
              {challenge.active ? 'Continue Challenge' : 'Join Challenge'}
            </ChallengeButton>
          </ChallengeCard>
        ))}
      </ChallengeList>
    </Card>
  );
};

export default ActiveChallenges; 