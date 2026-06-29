import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, loading, onDelete, onEdit, onStatusChange }) => {
  if (loading) {
    return <div className="empty-state">Loading tasks...</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="card empty-state">
        <h3>No tasks found</h3>
        <p>You're all caught up! Enjoy your free time or add a new task.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onDelete={onDelete}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default TaskList;
