const express = require('express');
const router = express.Router();

let tasks = [];
let nextId = 1;

//GET
router.get('/', (req, res) => {
    res.status(200).json(tasks);
});

//POST
router.post('/', (req, res) => {
    const { title, description, priority} = req.body;
    //validate title
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
    }

    //validate priority
    const validPriorities = ['low', 'medium', 'high'];
    let taskPriority = 'medium'; // default priority
    if (priority) {
        if (!validPriorities.includes(priority)) {
            return res.status(400).json({ error: 'Invalid priority value' });
        }
        taskPriority = priority;
    }

    const newTask = {
        id:nextId++,
        title: title.trim(),
        description: description ? description.trim() : '',
        completed: false,
        createdAt: new Date(),
        priority: taskPriority
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

//PUT
router.put('/:id', (req, res) => {
    const id= Number(req.params.id);
    const { title, description, completed, priority } = req.body;
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    if (title !== undefined) {
        if (typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({ error: 'Invalid title value' });
        }
        task.title = title.trim();
    }
    if (description !== undefined) {
        if (typeof description !== 'string') {
            return res.status(400).json({ error: 'Invalid description value' });
        }
        task.description = description.trim();
    }

    if (completed !== undefined) {
        if (typeof completed !== 'boolean') {
            return res.status(400).json({ error: 'Invalid completed value' });
        }
        task.completed = completed;
    }
    if (priority !== undefined) {
        const validPriorities = ['low', 'medium', 'high'];
        if (!validPriorities.includes(priority)) {
            return res.status(400).json({ error: 'Invalid priority value' });
        }
        task.priority = priority;
    }

    res.status(200).json(task);
}
);

//DELETE
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }   
    
    tasks.splice(index, 1);
    res.status(204).send();
});

//PATCH
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