import React from 'react';
import { FiEdit2, FiTrash2, FiClock } from 'react-icons/fi';

const TaskItem = ({ task, onDelete, onEdit, onStatusChange }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'In Progress': return 'status-inprogress';
      case 'Completed': return 'status-completed';
      default: return '';
    }
  };

  const formattedDate = task.dueDate 
    ? new Date(task.dueDate).toLocaleDateString() 
    : 'No due date';

  return (
    <div className="card task-item">
      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title" style={{ textDecoration: task.status === 'Completed' ? 'line-through' : 'none', color: task.status === 'Completed' ? 'var(--text-muted)' : 'var(--text-main)' }}>
            {task.title}
          </h3>
          <span className={`task-status ${getStatusClass(task.status)}`}>
            {task.status}
          </span>
        </div>
        
        {task.description && (
          <p className="task-desc">{task.description}</p>
        )}
        
        <div className="task-meta">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <FiClock /> {formattedDate}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <select 
          value={task.status} 
          onChange={(e) => onStatusChange(task._id, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <button 
            className="btn btn-primary" 
            style={{ padding: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => onEdit(task)}
            title="Edit Task"
          >
            <FiEdit2 size={16} />
          </button>
          <button 
            className="btn btn-danger" 
            style={{ padding: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this task?')) {
                onDelete(task._id);
              }
            }}
            title="Delete Task"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
