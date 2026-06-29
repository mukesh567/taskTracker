import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './index.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('newest');
  
  // Edit state
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [filter, sort]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}?status=${filter}&sort=${sort}`);
      setTasks(data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const { data } = await axios.post(API_URL, taskData);
      setTasks((prev) => [data, ...prev]);
      toast.success('Task created successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (id, updatedData) => {
    try {
      const { data } = await axios.put(`${API_URL}/${id}`, updatedData);
      setTasks((prev) => prev.map((t) => (t._id === id ? data : t)));
      setTaskToEdit(null);
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const task = tasks.find(t => t._id === id);
    if(task) {
      handleUpdateTask(id, { ...task, status: newStatus });
    }
  };

  return (
    <div className="app-container">
      <Toaster position="top-right" />
      <header className="header">
        <h1>Task Master</h1>
        <p>Manage your tasks efficiently and beautifully</p>
      </header>

      <main>
        <div className="card task-form">
          <TaskForm 
            onSubmit={taskToEdit ? (data) => handleUpdateTask(taskToEdit._id, data) : handleCreateTask}
            taskToEdit={taskToEdit}
            onCancelEdit={() => setTaskToEdit(null)}
          />
        </div>

        <div className="list-options">
          <div>
            <label htmlFor="filter">Filter: </label>
            <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort">Sort: </label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>
        </div>

        <TaskList 
          tasks={tasks} 
          loading={loading}
          onDelete={handleDeleteTask}
          onEdit={setTaskToEdit}
          onStatusChange={handleStatusChange}
        />
      </main>
    </div>
  );
}

export default App;
