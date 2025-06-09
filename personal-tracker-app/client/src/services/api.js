const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const saveWellnessData = async (userId, wellnessData) => {
  try {
    const response = await fetch(`${API_URL}/wellness`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, ...wellnessData }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving wellness data:', error);
    throw error;
  }
};

export const getWellnessData = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/wellness/${userId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching wellness data:', error);
    throw error;
  }
};

export const saveChallenge = async (challengeData) => {
  try {
    const response = await fetch(`${API_URL}/challenges`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(challengeData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving challenge:', error);
    throw error;
  }
};

export const getChallenges = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/challenges/${userId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching challenges:', error);
    throw error;
  }
}; 