import React, { useState } from 'react';

const challengeStyle = {
  background: '#1a1a1a',
  borderRadius: 16,
  boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
  padding: 32,
  marginBottom: 32,
  flex: 1,
  minWidth: 260,
  color: '#fff',
  transition: 'transform 0.3s ease',
};

const challengeListStyle = {
  marginTop: 20,
};

const challengeItemStyle = {
  padding: 16,
  background: '#2a2a2a',
  borderRadius: 8,
  marginBottom: 16,
};

const buttonStyle = {
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '10px 20px',
  fontWeight: 600,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 16,
  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
};

function Challenge() {
  const [challenges, setChallenges] = useState([
    { id: 1, title: 'Daily Exercise', description: 'Exercise for 30 minutes every day.', completed: false },
    { id: 2, title: 'Healthy Eating', description: 'Eat at least 5 servings of fruits and vegetables daily.', completed: false },
  ]);

  const joinChallenge = (id) => {
    setChallenges(challenges.map(challenge =>
      challenge.id === id ? { ...challenge, completed: true } : challenge
    ));
  };

  return (
    <div style={challengeStyle}>
      <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Challenges</h3>
      <div style={challengeListStyle}>
        {challenges.map(challenge => (
          <div key={challenge.id} style={challengeItemStyle}>
            <h4 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{challenge.title}</h4>
            <p>{challenge.description}</p>
            {!challenge.completed && (
              <button onClick={() => joinChallenge(challenge.id)} style={buttonStyle}>
                Join Challenge
              </button>
            )}
            {challenge.completed && <p style={{ color: '#28a745' }}>Completed!</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Challenge; 