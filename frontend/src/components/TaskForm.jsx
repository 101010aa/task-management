import React, { useState } from 'react';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(() => ({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'pending',
    due_date: task?.due_date ? task.due_date.split('T')[0] : '',
  }));
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.due_date) {
      newErrors.due_date = 'Due date is required';
    } else if (new Date(formData.due_date) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.due_date = 'Due date cannot be in the past';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title" className="form-label">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`form-input ${errors.title ? 'error' : ''}`}
          placeholder="Enter task title"
        />
        {errors.title && <div className="form-error">{errors.title}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          className="form-textarea"
          placeholder="Enter task description (optional)"
        />
      </div>

      <div className="form-group">
        <label htmlFor="status" className="form-label">Status *</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="form-select"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="due_date" className="form-label">Due Date *</label>
        <input
          type="date"
          id="due_date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          className={`form-input ${errors.due_date ? 'error' : ''}`}
        />
        {errors.due_date && <div className="form-error">{errors.due_date}</div>}
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-cancel">Cancel</button>
        <button type="submit" className="btn btn-primary">
          {task ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;