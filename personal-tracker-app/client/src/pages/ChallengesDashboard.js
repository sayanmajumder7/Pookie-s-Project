import React, { useState } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

const ChallengeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ChallengeCard = styled.div`
  background: var(--glass);
  border-radius: 20px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px var(--shadow);
  }
`;

const ChallengeTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
`;

const ChallengeDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: var(--primary-gradient);
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const Button = styled.button`
  background: var(--primary-gradient);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px var(--shadow);
  }
`;

const AchievementsSection = styled.div`
  background: var(--glass);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 3rem;
`;

const AchievementsTitle = styled.h2`
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const Achievement = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.1);
  }
`;

const AchievementIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const AchievementTitle = styled.h4`
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const AchievementDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

function ChallengesDashboard() {
  const [challenges] = useState([
    {
      id: 1,
      title: '30 Days of Meditation',
      description: 'Complete 10 minutes of meditation every day for 30 days',
      progress: 60,
      daysLeft: 12,
      points: 300
    },
    {
      id: 2,
      title: 'Hydration Challenge',
      description: 'Drink 8 glasses of water daily for 21 days',
      progress: 85,
      daysLeft: 3,
      points: 200
    },
    {
      id: 3,
      title: 'Morning Workout',
      description: 'Complete a 30-minute workout every morning for 14 days',
      progress: 40,
      daysLeft: 8,
      points: 250
    }
  ]);

  const [achievements] = useState([
    {
      id: 1,
      icon: '🏆',
      title: 'Early Bird',
      description: 'Completed 7 morning workouts in a row'
    },
    {
      id: 2,
      icon: '💧',
      title: 'Hydration Master',
      description: 'Maintained perfect water intake for 14 days'
    },
    {
      id: 3,
      icon: '🧘',
      title: 'Zen Master',
      description: 'Completed 30 days of meditation'
    }
  ]);

  const handleCompleteChallenge = (challengeId) => {
    // Handle challenge completion logic here
    console.log(`Completing challenge ${challengeId}`);
  };

  return (
    <Container>
      <Header>
        <Title>Your Challenges</Title>
        <Subtitle>Track your progress and earn rewards</Subtitle>
      </Header>

      <ChallengeGrid>
        {challenges.map(challenge => (
          <ChallengeCard key={challenge.id}>
            <ChallengeTitle>{challenge.title}</ChallengeTitle>
            <ChallengeDescription>{challenge.description}</ChallengeDescription>
            <ProgressBar>
              <ProgressFill style={{ width: `${challenge.progress}%` }} />
            </ProgressBar>
            <Stats>
              <span>{challenge.daysLeft} days left</span>
              <span>{challenge.points} points</span>
            </Stats>
            <Button onClick={() => handleCompleteChallenge(challenge.id)}>
              Complete Challenge
            </Button>
          </ChallengeCard>
        ))}
      </ChallengeGrid>

      <AchievementsSection>
        <AchievementsTitle>Recent Achievements</AchievementsTitle>
        <AchievementsGrid>
          {achievements.map(achievement => (
            <Achievement key={achievement.id}>
              <AchievementIcon>{achievement.icon}</AchievementIcon>
              <AchievementTitle>{achievement.title}</AchievementTitle>
              <AchievementDescription>{achievement.description}</AchievementDescription>
            </Achievement>
          ))}
        </AchievementsGrid>
      </AchievementsSection>
    </Container>
  );
}

export default ChallengesDashboard; 