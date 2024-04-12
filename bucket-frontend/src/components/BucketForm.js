// BucketForm.js
import React, { useState } from 'react';
import axios from 'axios';

function BucketForm() {
  const [bucketName, setBucketName] = useState('');
  const [volume, setVolume] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleBucketNameChange = (e) => {
    setBucketName(e.target.value);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bucketName.trim() || !volume.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:9001/api/v1/buckets', {
        bucket_name: bucketName,
        volume: parseInt(volume)
      });
      setSuccessMsg(response.data.message);
      setTimeout(() => setSuccessMsg(''), 2000);
      setSuccess(true);
      setErrorMsg('');
      setBucketName('');
      setVolume('');
    } catch (error) {
      console.error('Error adding ball:', error);
      setTimeout(() => {
        setErrorMsg(error);
        }, 2000);
      setSuccessMsg('');
      setBucketName('');
      setVolume('');
      setSuccess(false);
    }
  };

  const handleCancel = () => {
    setBucketName('');
    setVolume('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2>Bucket Form</h2>
      <div className=" col col-lg-10 mb-3">
        <label htmlFor="bucketName" className="form-label">Bucket Name:</label>
        <input type="text" className="form-control" id="bucketName" value={bucketName} onChange={handleBucketNameChange} />
      </div>
      <div className="col col-lg-10 mb-3">
        <label htmlFor="volume" className="form-label">Volume (in inches):</label>
        <input type="number" className="form-control" id="volume" value={volume} onChange={handleVolumeChange} />
      </div>
      <div> { success ? <p style={{color:"green"}}>{successMsg}</p> : <p style={{color:"red"}}>{errorMsg}</p> } </div>
      <button type="submit" className="btn btn-primary me-2">Submit</button>
      <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
    </form>
  );
}

export default BucketForm;
