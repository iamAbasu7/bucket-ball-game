// BucketResults.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Results() {
  const [bucketNames, setBucketNames] = useState([]);

  useEffect(() => {
    const fetchBucketNames = async () => {
      try {
        const response = await axios.get('http://localhost:9001/api/v1/buckets');
        setBucketNames(response.data.bucket_names);
      } catch (error) {
        console.error('Error fetching bucket names:', error);
      }
    };

    fetchBucketNames();
  }, []);

  return (
    <div>
      <h2 className='p-5'>Bucket Results</h2>
      <div>
        {bucketNames.map((bucketName, index) => (
          <div key={index}>
            <p>{bucketName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;
