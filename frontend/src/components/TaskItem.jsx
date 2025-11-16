import React from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'status-badge status-completed';
      case 'in-progress':
        return 'status-badge status-in-progress';
      default:
        return 'status-badge status-pending';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <div className="task-item">
      <div className="task-header">
        <div className="task-content">
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          <div className="task-meta">
            <span className={getStatusClass(task.status)}>
              {task.status.replace('-', ' ')}
            </span>
            <span className="due-date">
              Due: {formatDate(task.due_date)}
            </span>
          </div>
        </div>
        <div className="task-actions">
          <button
            onClick={() => onEdit(task)}
            className="btn btn-edit"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;