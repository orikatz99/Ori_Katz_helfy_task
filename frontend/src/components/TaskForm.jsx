import { useState } from 'react';

function TaskForm({ onAddTask  }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');

    function handleSubmit(e) {
        e.preventDefault();
        if(!title.trim()) 
            return;
        onAddTask ({ title, description, priority });
        setTitle('');
        setDescription('');
        setPriority('medium');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="text"
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}>

                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <button type="submit">Add Task</button>
        </form>
    );
}

export default TaskForm;
