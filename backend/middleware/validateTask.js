const validPriorities = ['low', 'medium', 'high'];

function validateTask(req, res, next) {
    const { title, description, completed, priority } = req.body;

    if (title !== undefined) {
        if (typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({ error: 'Invalid title value' });
        }
    }

    if (description !== undefined) {
        if (typeof description !== 'string') {
            return res.status(400).json({ error: 'Invalid description value' });
        }
    }

    if (completed !== undefined) {
        if (typeof completed !== 'boolean') {
            return res.status(400).json({ error: 'Invalid completed value' });
        }
    }

    if (priority !== undefined) {
        if (!validPriorities.includes(priority)) {
            return res.status(400).json({ error: 'Invalid priority value' });
        }
    }

    next();
}

module.exports = validateTask;