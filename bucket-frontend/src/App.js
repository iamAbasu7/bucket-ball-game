// App.js
import React from 'react';
import BucketForm from './components/BucketForm';
import BallForm from './components/BallForm';
import Suggestions from './components/Suggestions';
import Results from './components/Results';

function App() {
  return (
    <div className="App">
      <h1 className='p-5'>Bucket and Ball Forms</h1>
        <div className='d-flex flex-row p-5'>
          <BucketForm />
          <BallForm />
        </div>
        <div className='d-flex flex-row p-5'>
          <Suggestions />
          <Results />
        </div>
    </div>
  );
}

export default App;
