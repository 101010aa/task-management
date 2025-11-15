import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { taskAPI } from '../services/api';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await taskAPI.getById(id);
        setTask(response.data);
      } catch (err) {
        setError('Failed to fetch task. Please check if the task exists.');
        console.error('Error fetching task:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await taskAPI.update(id, formData);
      navigate('/');
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading task...</div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="container">
        <div className="error-message text-center">
          <p>Task not found</p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary mt-2"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-section">
        <h1>Edit Task</h1>
        <p>Update task details</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="form-card">
        <TaskForm
          task={task}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default EditTask;