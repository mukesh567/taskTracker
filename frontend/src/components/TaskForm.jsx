import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, taskToEdit, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    dueDate: ''
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description || '',
        status: taskToEdit.status,
        dueDate: taskToEdit.dueDate ? taskToEdit.dueDate.split('T')[0] : ''
      });
    } else {
      setFormData({ title: '', description: '', status: 'Pending', dueDate: '' });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onSubmit(formData);
    
    if (!taskToEdit) {
      setFormData({ title: '', description: '', status: 'Pending', dueDate: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>
        {taskToEdit ? 'Edit Task' : 'Create New Task'}
      </h2>
      
      <div className="input-group">
        <label htmlFor="title">Task Title *</label>
        <input 
          type="text" 
          id="title"
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          className="input-field"
          placeholder="What needs to be done?"
        />
        {errors.title && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errors.title}</span>}
      </div>

      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label htmlFor="description">Description</label>
        <textarea 
          id="description"
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          className="input-field"
          placeholder="Add details..."
          rows="3"
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <div className="input-group" style={{ flex: 1 }}>
          <label htmlFor="status">Status</label>
          <select 
            id="status"
            name="status" 
            value={formData.status} 
            onChange={handleChange}
            className="input-field"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="input-group" style={{ flex: 1 }}>
          <label htmlFor="dueDate">Due Date</label>
          <input 
            type="date" 
            id="dueDate"
            name="dueDate" 
            value={formData.dueDate} 
            onChange={handleChange}
            className="input-field"
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
          {taskToEdit ? 'Update Task' : 'Add Task'}
        </button>
        {taskToEdit && (
          <button type="button" onClick={onCancelEdit} className="btn btn-danger">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
