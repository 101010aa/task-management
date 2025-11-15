import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import { taskAPI } from '../services/api';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getAll();
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks. Please check if the backend server is running.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    navigate(`/edit/${task.id}`);
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.delete(taskId);
        setTasks(tasks.filter(task => task.id !== taskId));
      } catch (err) {
        setError('Failed to delete task');
        console.error('Error deleting task:', err);
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Task Manager</h1>
        <Link to="/add" className="btn btn-primary">
          Add New Task
        </Link>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <TaskList
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default Home;