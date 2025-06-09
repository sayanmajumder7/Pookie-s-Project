import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [habits, setHabits] = useState(['']);
  const [lifestyle, setLifestyle] = useState('');
  const [score, setScore] = useState(0);
  const [challenges, setChallenges] = useState([]);
  const [joined, setJoined] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!token) return navigate('/login');
    // Fetch tracker data
    axios.get('http://localhost:5000/api/tracker', authHeader)
      .then(res => {
        if (res.data) {
          setHabits(res.data.habits || ['']);
          setLifestyle(res.data.lifestyle || '');
          setScore(res.data.score || 0);
        }
      });
    // Fetch challenges
    axios.get('http://localhost:5000/api/challenge', authHeader)
      .then(res => setChallenges(res.data));
  }, []);

  useEffect(() => {
    // Fetch joined challenges
    axios.get('http://localhost:5000/api/tracker', authHeader)
      .then(res => setJoined(res.data?.joinedChallenges || []));
  }, []);

  const handleHabitChange = (idx, value) => {
    const newHabits = [...habits];
    newHabits[idx] = value;
    setHabits(newHabits);
  };

  const addHabit = () => setHabits([...habits, '']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/tracker', { habits, lifestyle }, authHeader);
      setScore(res.data.score);
    } catch (err) {
      setError('Failed to update tracker');
    }
  };

  const joinChallenge = async (id) => {
    await axios.post(`http://localhost:5000/api/challenge/join/${id}`, {}, authHeader);
    setJoined([...joined, id]);
  };

  const completeChallenge = async (id) => {
    await axios.post(`http://localhost:5000/api/challenge/complete/${id}`, {}, authHeader);
    setJoined(joined.filter(j => j !== id));
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Dashboard</h2>
      <button onClick={logout} style={{ float: 'right' }}>Logout</button>
      <h3>Your Tracker</h3>
      <form onSubmit={handleSubmit}>
        <label>Habits:</label><br />
        {habits.map((h, i) => (
          <input key={i} type="text" value={h} onChange={e => handleHabitChange(i, e.target.value)} style={{ marginBottom: 4 }} />
        ))}
        <button type="button" onClick={addHabit}>Add Habit</button><br />
        <label>Lifestyle:</label><br />
        <input type="text" value={lifestyle} onChange={e => setLifestyle(e.target.value)} /><br />
        <button type="submit">Save</button>
      </form>
      <p>Score: {score}</p>
      <h3>Challenges</h3>
      <ul>
        {challenges.map(ch => (
          <li key={ch._id}>
            <b>{ch.title}</b>: {ch.description} <br />
            {joined.includes(ch._id) ? (
              <button onClick={() => completeChallenge(ch._id)}>Complete</button>
            ) : (
              <button onClick={() => joinChallenge(ch._id)}>Join</button>
            )}
          </li>
        ))}
      </ul>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Dashboard; 