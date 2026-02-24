const express = require('express');
const router = express.Router();
const validateTask = require('../middleware/validateTask');

let tasks = [];
let nextId = 1;

// GET
router.get('/', (req, res) => {
    res.status(200).json(tasks);
});

// POST
router.post('/', validateTask, (req, res) => {
    const { title, description, priority } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    let taskPriority = 'medium';
    if (priority) {
        taskPriority = priority;
    }

    const newTask = {
        id: nextId++,
        title: title.trim(),
        description: description ? description.trim() : '',
        completed: false,
        createdAt: new Date(),
        priority: taskPriority
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT
router.put('/:id', validateTask, (req, res) => {
    const id = Number(req.params.id);
    const { title, description, completed, priority } = req.body;

    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    if (title !== undefined) {
        task.title = title.trim();
    }

    if (description !== undefined) {
        task.description = description.trim();
    }

    if (completed !== undefined) {
        task.completed = completed;
    }

    if (priority !== undefined) {
        task.priority = priority;
    }

    res.status(200).json(task);
});

// DELETE
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(index, 1);
    res.status(204).send();
});

// PATCH
router.patch('/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    task.completed = !task.completed;
    res.status(200).json(task);
});

module.exports = router;