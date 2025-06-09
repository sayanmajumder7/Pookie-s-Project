const API_URL = 'http://localhost:3002/api';

export const testBackendConnection = async () => {
  try {
    const response = await fetch(`${API_URL}/test`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error connecting to backend:', error);
    throw error;
  }
}; 