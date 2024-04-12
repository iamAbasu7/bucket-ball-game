// BallForm.js
import React, { useState } from 'react';
import axios from 'axios';

function BallForm() {
  const [ballName, setBallName] = useState('');
  const [volume, setVolume] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleBallNameChange = (e) => {
    setBallName(e.target.value);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ballName.trim() || !volume.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:9001/api/v1/balls', {
        ball_name: ballName,
        volume: parseInt(volume)
      });
      setSuccessMsg(response.data.message);
      setTimeout(() => setSuccessMsg(''), 2000);
      setSuccess(true);
      setErrorMsg('');
      setBallName('');
      setVolume('');
      window.location.reload();
    } catch (error) {
      console.error('Error adding ball:', error);
      setTimeout(() => {
        setErrorMsg(error);
        }, 2000);
      setSuccessMsg('');
      setBallName('');
      setVolume('');
      setSuccess(false);
    }
  };

  const handleCancel = () => {
    setBallName('');
    setVolume('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2>Ball Form</h2>
      <div className="col col-lg-11 mb-3">
        <label htmlFor="ballName" className="form-label">Ball Name:</label>
        <input type="text" className="form-control" id="ballName" value={ballName} onChange={handleBallNameChange} />
      </div>
      <div className="col col-lg-11 mb-3">
        <label htmlFor="volume" className="form-label">Volume (in inches):</label>
        <input type="number" className="form-control" id="volume" value={volume} onChange={handleVolumeChange} />
      </div>
      <div> { success ? <p style={{color:"green"}}>{successMsg}</p> : <p style={{color:"red"}}>{errorMsg}</p> } </div>
      <button type="submit" className="btn btn-primary me-2">Submit</button>
      <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
    </form>
  );
}

export default BallForm;
