import { useEffect, useState } from "react";
import { getTasks } from "./services/api";
import TaskList from "./components/TaskList";
import { createTask } from "./services/api";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);

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
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Tasks</h1>
      <TaskForm onAddTask={handleTaskAdded} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;