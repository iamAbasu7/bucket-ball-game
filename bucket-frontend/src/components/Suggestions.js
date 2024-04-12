// Suggestions.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Suggestions() {
  const [ballNames, setBallNames] = useState([]);
  const [ballValues, setBallValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBallNames = async () => {
      try {
        const response = await axios.get('http://localhost:9001/api/v1/balls');
        const initialBallValues = {};
        response.data.ball_name.forEach((ballName) => {
          initialBallValues[ballName] = ''; // Initialize each ball with an empty string
        });
        setBallNames(response.data.ball_name);
        setBallValues(initialBallValues);
      } catch (error) {
        console.error('Error fetching ball names:', error);
      }
    };

    fetchBallNames();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBallValues({ ...ballValues, [name]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Filter out any empty values
      const dataToSend = {};
      Object.keys(ballValues).forEach((key) => {
        if (ballValues[key]) {
          dataToSend[key] = parseInt(ballValues[key]);
        }
      });

      // Make POST request
      await axios.post('http://localhost:9001/api/v1/submit', dataToSend);

      // Reset input values after successful submission
      setBallValues({});
    } catch (error) {
      console.error('Error submitting data:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className='p-5'>
      <h2>Bucket Suggestions</h2>
      <div>
        {ballNames.map((ballName, index) => (
          <div key={index}>
            <p>{ballName}:</p>
            <input
              type="text"
              name={ballName}
              value={ballValues[ballName] || ''}
              onChange={handleInputChange}
            />
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
}

export default Suggestions;

