const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks (with optional sorting/filtering)
router.get('/', async (req, res) => {
  try {
    const { status, sort } = req.query;
    let query = {};
    if (status && status !== 'All') {
      query.status = status;
    }

    let sortQuery = { createdAt: -1 }; // default sort by newest
    if (sort === 'oldest') sortQuery = { createdAt: 1 };
    if (sort === 'dueDate') sortQuery = { dueDate: 1 };

    const tasks = await Task.find(query).sort(sortQuery);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newTask = new Task({ title, description, status, dueDate });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, dueDate },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
