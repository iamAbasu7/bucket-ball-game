import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Results() {
  const [output, setOutput] = useState([]);

  useEffect(() => {
    const fetchBucketNames = async () => {
      try {
        const response = await axios.get('http://localhost:9001/api/v1/buckets');
        setOutput(response.data);
      } catch (error) {
        console.error('Error fetching bucket names:', error);
      }
    };
    fetchBucketNames();
  }, []);

  return (
    <div className='mx-5'>
      <h2 className='p-2'>Bucket Results</h2>
      <div>
        {output.map((op, index) => (
          <div key={index}>
            <p>{op}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;
