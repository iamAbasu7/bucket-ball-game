// BucketResults.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Results() {
  const [output, setOutput] = useState('');

function reformatString(input) {
  // Join the array of strings into a single string with line breaks
  const joinedString = input.join('\n');

  // Replace occurrences of 'Bucket' followed by a capital letter with 'Bucket' followed by a line break
  const formattedString = joinedString.replace(/Bucket (?=[A-Z])/g, 'Bucket\n');

  return formattedString;
}

  useEffect(() => {
    const fetchBucketNames = async () => {
      try {
        const response = await axios.get('http://localhost:9001/api/v1/buckets');
        setOutput(reformatString(response.data));
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
        {output}
      </div>
    </div>
  );
}

export default Results;
