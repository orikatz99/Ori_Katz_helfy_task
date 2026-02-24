import { useEffect, useState } from "react";
import { getTasks, createTask, toggleTask, deleteTask, updateTask } from "./services/api";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import "./styles/main.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);
  const [fiter, setFilter] = useState('all');

  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchTasks();
  }, []);

  async function handleTaskAdded(task) {
    try {
      const newTask = await createTask(task); 
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggle(id) {
    try {
      const updatedTask = await toggleTask(id);
      setTasks(prev =>prev.map(task =>task.id === id ? updatedTask : task));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    }catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdate(id, updatedData) {
    try {
      const updatedTask = await updateTask(id, updatedData);
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
    } catch (err) {
      setError(err.message);
    }
  }

  const filteredTasks = tasks.filter(task => {
    if (fiter === 'completed') return task.completed;
    if (fiter === 'pending') return !task.completed;
    return true;
  }
  );
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
  <div className="app-container">
    <h1>Tasks</h1>
    <TaskForm onAddTask={handleTaskAdded} />
    <TaskList
      tasks={tasks}
      onToggle={handleToggle}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />
  </div>
);
}

export default App;