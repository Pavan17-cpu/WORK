import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddWorkForm.css';

const AddWorkForm = () => {
  const [workName, setWorkName] = useState('');
  const [endTime, setEndTime] = useState('');
  const [type, setType] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://work16.onrender.com/api/works', {
        workName,
        endTime,
        type,
      });
      console.log('Work added:', response.data);

      // Redirect to WorksList page
      navigate('/works');
    } catch (error) {
      console.error('Failed to add work:', error);
    }

    setWorkName('');
    setEndTime('');
    setType('');
  };

  return (
    
    <form className="add-work-form" onSubmit={handleSubmit}>
      <label htmlFor="workName">Work Name:</label>
      <input
        type="text"
        id="workName"
        placeholder="Enter work name"
        value={workName}
        onChange={(e) => setWorkName(e.target.value)}
      />

      <label htmlFor="endTime">End Time:</label>
      <input
        type="datetime-local"
        id="endTime"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />

      <label htmlFor="type">Type:</label>
      <input
        type="text"
        id="type"
        placeholder="Enter type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <button type="submit">Add Work</button>

      <button type="button" onClick={() => navigate('/works')}>
        Go to Works List
      </button>
    </form>

  );
};

export default AddWorkForm;
