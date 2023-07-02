import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const WorksList = () => {
  const [works, setWorks] = useState([]);
  const [selectedWork, setSelectedWork] = useState(null);
  const [updateWorkData, setUpdateWorkData] = useState({
    workName: '',
    endTime: '',
    type: '',
  });

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await axios.get('https://work16.onrender.com/api/works');
        setWorks(response.data);
      } catch (error) {
        console.error('Failed to retrieve works:', error);
      }
    };

    fetchWorks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://work16.onrender.com/api/works/${id}`);
      setWorks(works.filter((work) => work._id !== id));
      console.log('Work deleted:', id);
    } catch (error) {
      console.error('Failed to delete work:', error);
    }
  };

  const handleUpdate = (work) => {
    setSelectedWork(work);
    setUpdateWorkData({
      workName: work.workName,
      endTime: work.endTime,
      type: work.type,
    });
  };

  const handleInputChange = (e) => {
    setUpdateWorkData({
      ...updateWorkData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`https://work16.onrender.com/api/works/${selectedWork._id}`, updateWorkData);
      console.log('Work updated:', response.data);

      // Update the works list with the updated work data
      const updatedWorks = works.map((work) =>
        work._id === selectedWork._id ? response.data.work : work
      );
      setWorks(updatedWorks);

      // Reset the selected work and update data
      setSelectedWork(null);
      setUpdateWorkData({
        workName: '',
        endTime: '',
        type: '',
      });
    } catch (error) {
      console.error('Failed to update work:', error);
    }
  };

  const formatTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12) || 12;

    return `${formattedHours}:${minutes} ${period}`;
  };

  // Sort works based on the nearest deadline
  const sortedWorks = works.sort((a, b) => new Date(a.endTime) - new Date(b.endTime));

  return (
    
    <div style={{ textAlign: 'center' }}>
      <Link to="/addwork">
        <button style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Add Work
        </button>
      </Link>
      <table style={{ borderCollapse: 'collapse', border: '1px solid #ccc', margin: '20px auto' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Work Name</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>End Date</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>End Time</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Type</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedWorks.map((work) => (
            <tr key={work._id}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{work.workName}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{work.endTime.split('T')[0]}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{formatTime(work.endTime)}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{work.type}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                <button onClick={() => handleUpdate(work)}>Update</button>
                <button onClick={() => handleDelete(work._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for updating work */}
      {selectedWork && (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f2f2f2', border: '1px solid #ccc' }}>
        <h3 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '10px' }}>Update Work</h3>
          <form onSubmit={handleFormSubmit}>
            <div>
            <label htmlFor="workName" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Work Name:</label>
              <input
                type="text"
                name="workName"
                value={updateWorkData.workName}
                onChange={handleInputChange}
                style={{ padding: '8px' }}
              />
            </div>
            <br/>
            <div>
            <label htmlFor="workName" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>End Time:</label>
              <input
                type="text"
                name="endTime"
                value={updateWorkData.endTime}
                onChange={handleInputChange}
                style={{ padding: '8px' }}
              />
            </div>
            <br/>
            <div>
            <label htmlFor="workName" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Type:</label>
              <input
                type="text"
                name="type"
                value={updateWorkData.type}
                onChange={handleInputChange}
                style={{ padding: '8px' }}
              />
            
            </div>
            <br/>
            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </div>
    
  );
};

export default WorksList;
