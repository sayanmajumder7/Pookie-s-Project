import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Header from './components/layout/Header';
import Hero from './components/layout/Hero';
import DailyCheckIn from './components/features/DailyCheckIn';
import WellnessScore from './components/features/WellnessScore';
import ActiveChallenges from './components/features/ActiveChallenges';
import WeeklyProgress from './components/features/WeeklyProgress';
import { saveWellnessData, getWellnessData, getChallenges } from './services/api';
import './App.css';

const Container = styled.div`
  min-height: 100vh;
  transition: all 0.3s;
  background: ${props => props.darkMode 
    ? 'linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #2d3748 100%)'
    : 'linear-gradient(135deg, #e6e6fa 0%, #f0fff4 50%, #fdf2f8 100%)'
  };
  color: ${props => props.darkMode ? '#f7fafc' : '#2d3748'};
`;

const Main = styled.main`
  max-width: 72rem;
  margin: 0 auto;
  padding: 2rem 1.25rem;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    sleep: '',
    water: '',
    exercise: '',
    steps: '',
    mood: '',
    stress: ''
  });
  const [wellnessScore, setWellnessScore] = useState(85);
  const [showConfetti, setShowConfetti] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const [weeklyProgress, setWeeklyProgress] = useState([]);
  const [userId] = useState('user123'); // In a real app, this would come from authentication

  const totalSteps = 3;

  const formSteps = [
    {
      title: 'Basic Info',
      fields: [
        { key: 'sleep', label: 'Hours of Sleep', placeholder: '8', min: 0, max: 24 },
        { key: 'water', label: 'Water Intake (glasses)', placeholder: '8', min: 0, max: 20 }
      ]
    },
    {
      title: 'Activity',
      fields: [
        { key: 'exercise', label: 'Exercise Minutes', placeholder: '30', min: 0 },
        { key: 'steps', label: 'Steps Taken', placeholder: '10000', min: 0 }
      ]
    },
    {
      title: 'Wellness',
      fields: [
        { key: 'mood', label: 'Mood (1-10)', placeholder: '8', min: 1, max: 10 },
        { key: 'stress', label: 'Stress Level (1-10)', placeholder: '3', min: 1, max: 10 }
      ]
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [wellnessData, challengesData] = await Promise.all([
          getWellnessData(userId),
          getChallenges(userId)
        ]);
        
        if (wellnessData && wellnessData.length > 0) {
          const latestData = wellnessData[0];
          setWellnessScore(latestData.wellnessScore);
          setFormData({
            sleep: latestData.sleep,
            water: latestData.water,
            exercise: latestData.exercise,
            steps: latestData.steps,
            mood: latestData.mood,
            stress: latestData.stress
          });
        }
        
        if (challengesData && Array.isArray(challengesData)) {
          setChallenges(challengesData);
        }
        
        // Process weekly progress from wellness data
        if (wellnessData && Array.isArray(wellnessData)) {
          const progress = wellnessData.slice(0, 7).map(data => ({
            day: new Date(data.date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
            completed: true,
            badge: '🏆'
          }));
          setWeeklyProgress(progress);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set default weekly progress if API call fails
        setWeeklyProgress([
          { day: 'MON', completed: true, badge: '🏆' },
          { day: 'TUE', completed: true, badge: '⭐' },
          { day: 'WED', completed: true, badge: '💎' },
          { day: 'THU', completed: true, badge: '🎯' },
          { day: 'FRI', completed: true, badge: '🔥' },
          { day: 'SAT', completed: true, badge: '🌟' },
          { day: 'SUN', completed: true, badge: '✨' }
        ]);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/test');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Backend connected! Message:', data.message);
      } catch (error) {
        console.error('Failed to connect to backend:', error.message);
      }
    };
    checkBackend();
  }, []);

  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const changeStep = (direction) => {
    const newStep = currentStep + direction;
    if (newStep >= 0 && newStep < totalSteps) {
      setCurrentStep(newStep);
    }
  };

  const calculateWellnessScore = async () => {
    const sleep = parseInt(formData.sleep) || 0;
    const water = parseInt(formData.water) || 0;
    const exercise = parseInt(formData.exercise) || 0;
    const steps = parseInt(formData.steps) || 0;
    const mood = parseInt(formData.mood) || 0;
    const stress = parseInt(formData.stress) || 10;

    let score = 0;
    score += Math.min((sleep / 8) * 25, 25);
    score += Math.min((water / 8) * 20, 20);
    score += Math.min((exercise / 60) * 20, 20);
    score += Math.min((steps / 10000) * 15, 15);
    score += (mood / 10) * 10;
    score += ((10 - stress) / 10) * 10;

    const finalScore = Math.round(score);
    setWellnessScore(finalScore);
    setShowConfetti(true);
    
    try {
      await saveWellnessData(userId, {
        ...formData,
        wellnessScore: finalScore
      });
    } catch (error) {
      console.error('Error saving wellness data:', error);
    }
    
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: ['#ffd700', '#ff69b4', '#00ced1', '#98fb98'][Math.floor(Math.random() * 4)],
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: '2s'
          }}
        />
      ))}
    </div>
  );

  return (
    <Container darkMode={darkMode}>
      {showConfetti && <Confetti />}
      
      <Header darkMode={darkMode} toggleTheme={() => setDarkMode(!darkMode)} />
      
      <Main>
        <Hero />
        
        <DashboardGrid>
          <DailyCheckIn
            currentStep={currentStep}
            totalSteps={totalSteps}
            formData={formData}
            formSteps={formSteps}
            handleInputChange={handleInputChange}
            changeStep={changeStep}
            calculateWellnessScore={calculateWellnessScore}
          />
          
          <WellnessScore
            score={wellnessScore}
            getScoreLabel={getScoreLabel}
          />
          
          <ActiveChallenges challenges={challenges} />
          
          <WeeklyProgress weeklyProgress={weeklyProgress} />
        </DashboardGrid>
      </Main>
    </Container>
  );
};

export default App;