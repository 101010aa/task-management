import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { taskAPI } from '../services/api';

const AddTask = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    try {
      await taskAPI.create(formData);
      navigate('/');
    } catch {
      setError('Failed to create task. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className="form-section">
        <h1>Add New Task</h1>
        <p>Create a new task to manage</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-card">
        <TaskForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default AddTask;