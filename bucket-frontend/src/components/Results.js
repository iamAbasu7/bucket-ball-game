// BucketResults.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Results() {
  const [bucketNames, setBucketNames] = useState([]);
  const [output, setOutput] = useState([]);

  function reformatString(input) {
    const formattedString = input.replace(/Bucket (?=[A-Z])/g, 'Bucket\n');
    return formattedString;
}

  useEffect(() => {
    const fetchBucketNames = async () => {
      try {
        const response = await axios.get('http://localhost:9001/api/v1/buckets');
        setOutput(reformatString(response.data));
        const a = reformatString(output);
        console.log(a)
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
        {/* {bucketNames.map((bucketName, index) => (
          <div key={index}>
            <p>{bucketName}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default Results;
