import React, { useState } from 'react';

// Styles
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
    color: '#2d3748',
    fontFamily: 'Inter, sans-serif',
    padding: '20px',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    marginBottom: '30px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 700,
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    backdropFilter: 'blur(10px)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '16px',
    background: 'rgba(255, 255, 255, 0.8)',
  },
  button: {
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  scoreCircle: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    color: 'white',
    fontSize: '48px',
    fontWeight: 700,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  challengeCard: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  },
  progressBar: {
    height: '8px',
    background: '#e2e8f0',
    borderRadius: '4px',
    marginTop: '12px',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
  badge: {
    display: 'inline-block',
    padding: '8px 16px',
    background: 'rgba(102, 126, 234, 0.1)',
    borderRadius: '20px',
    color: '#667eea',
    fontSize: '14px',
    fontWeight: 600,
    margin: '4px',
  },
  weeklyLog: {
    marginTop: '20px',
  },
  logEntry: {
    padding: '12px',
    borderBottom: '1px solid #e2e8f0',
  },
};

function Dashboard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    sleep: '',
    exercise: '',
    water: '',
    mood: '😊',
  });
  const [wellnessScore, setWellnessScore] = useState(85);
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: '7-Day Hydration Boost',
      description: 'Drink 8 glasses of water daily',
      progress: 60,
      daysLeft: 3,
    },
    {
      id: 2,
      title: 'Daily Walk Challenge',
      description: 'Walk 10,000 steps every day',
      progress: 40,
      daysLeft: 5,
    },
  ]);
  const [weeklyLog, setWeeklyLog] = useState([
    { date: '2024-03-20', score: 85, mood: '😊' },
    { date: '2024-03-19', score: 82, mood: '😌' },
    { date: '2024-03-18', score: 88, mood: '😄' },
  ]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate new wellness score
    const newScore = Math.min(100, Math.max(0, 
      (parseInt(formData.sleep) || 0) * 0.3 +
      (parseInt(formData.exercise) || 0) * 0.4 +
      (parseInt(formData.water) || 0) * 0.3
    ));
    setWellnessScore(newScore);
    
    // Add to weekly log
    setWeeklyLog([
      {
        date: new Date().toISOString().split('T')[0],
        score: newScore,
        mood: formData.mood,
      },
      ...weeklyLog,
    ]);
    
    // Reset form
    setFormData({
      sleep: '',
      exercise: '',
      water: '',
      mood: '😊',
    });
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <div style={styles.logo}>Wellness Tracker</div>
        <button style={styles.button}>Profile</button>
      </nav>

      <div style={styles.mainContent}>
        {/* Wellness Score Card */}
        <div style={styles.card}>
          <h2>Your Wellness Score</h2>
          <div style={styles.scoreCircle}>
            {wellnessScore}
          </div>
          <p style={{ textAlign: 'center', marginTop: '16px' }}>
            Keep up the great work! Your wellness is improving.
          </p>
        </div>

        {/* Input Form Card */}
        <div style={styles.card}>
          <h2>Daily Check-in</h2>
          <form style={styles.form} onSubmit={handleSubmit}>
            <input
              type="number"
              name="sleep"
              placeholder="Hours of sleep"
              value={formData.sleep}
              onChange={handleInputChange}
              style={styles.input}
            />
            <input
              type="number"
              name="exercise"
              placeholder="Minutes of exercise"
              value={formData.exercise}
              onChange={handleInputChange}
              style={styles.input}
            />
            <input
              type="number"
              name="water"
              placeholder="Glasses of water"
              value={formData.water}
              onChange={handleInputChange}
              style={styles.input}
            />
            <select
              name="mood"
              value={formData.mood}
              onChange={handleInputChange}
              style={styles.input}
            >
              <option value="😊">Happy</option>
              <option value="😌">Calm</option>
              <option value="😄">Excited</option>
              <option value="😔">Tired</option>
            </select>
            <button type="submit" style={styles.button}>
              Update Score
            </button>
          </form>
        </div>

        {/* Challenges Card */}
        <div style={styles.card}>
          <h2>Active Challenges</h2>
          {challenges.map(challenge => (
            <div key={challenge.id} style={styles.challengeCard}>
              <h3>{challenge.title}</h3>
              <p>{challenge.description}</p>
              <div style={styles.progressBar}>
                <div 
                  style={{
                    ...styles.progressFill,
                    width: `${challenge.progress}%`,
                  }}
                />
              </div>
              <p>{challenge.daysLeft} days left</p>
            </div>
          ))}
        </div>

        {/* Weekly Log Card */}
        <div style={styles.card}>
          <h2>Weekly Progress</h2>
          <div style={styles.weeklyLog}>
            {weeklyLog.map((log, index) => (
              <div key={index} style={styles.logEntry}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{log.date}</span>
                  <span>{log.mood}</span>
                </div>
                <div style={styles.progressBar}>
                  <div 
                    style={{
                      ...styles.progressFill,
                      width: `${log.score}%`,
                    }}
                  />
                </div>
                <span>Score: {log.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 