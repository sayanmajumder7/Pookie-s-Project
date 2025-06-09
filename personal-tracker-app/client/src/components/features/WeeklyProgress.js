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

const ProgressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const DayCard = styled.div`
  background: ${props => props.completed 
    ? 'linear-gradient(to right, rgba(79,70,229,0.7), rgba(124,58,237,0.7))'
    : 'rgba(255, 255, 255, 0.1)'
  };
  border-radius: 1rem;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(79, 70, 229, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover::before {
    transform: translateX(100%);
  }
`;

const DayLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.completed ? '#ffffff' : '#a0aec0'};
  margin-bottom: 0.5rem;
  text-shadow: ${props => props.completed ? '0 1px 2px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const BadgeContainer = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  background: ${props => props.completed ? '#f6e05e' : 'transparent'};
  animation: ${props => props.completed ? 'bounce 1s infinite' : 'none'};
  opacity: ${props => props.completed ? 1 : 0};
  box-shadow: ${props => props.completed ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none'};

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
`;

const Message = styled.p`
  text-align: center;
  color: #4a5568;
  font-size: 0.875rem;
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const WeeklyProgress = ({ weeklyProgress = [] }) => {
  // Default weekly progress if none is provided
  const defaultProgress = [
    { day: 'MON', completed: true, badge: '🏆' },
    { day: 'TUE', completed: true, badge: '⭐' },
    { day: 'WED', completed: true, badge: '💎' },
    { day: 'THU', completed: true, badge: '🎯' },
    { day: 'FRI', completed: true, badge: '🔥' },
    { day: 'SAT', completed: true, badge: '🌟' },
    { day: 'SUN', completed: true, badge: '✨' }
  ];

  const displayProgress = weeklyProgress.length > 0 ? weeklyProgress : defaultProgress;

  return (
    <Card>
      <Title>This Week's Progress</Title>
      
      <ProgressGrid>
        {displayProgress.map((day, index) => (
          <DayCard key={index} completed={day.completed}>
            <DayLabel completed={day.completed}>{day.day}</DayLabel>
            <BadgeContainer completed={day.completed}>
              {day.completed && day.badge}
            </BadgeContainer>
          </DayCard>
        ))}
      </ProgressGrid>
      
      <Message>
        🔥 {displayProgress.filter(day => day.completed).length}-day streak! Keep going!
      </Message>
    </Card>
  );
};

export default WeeklyProgress;