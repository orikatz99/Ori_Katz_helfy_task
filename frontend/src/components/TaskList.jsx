function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <span
            onClick={() => onToggle(task.id)}
            style={{
              cursor: "pointer",
              textDecoration: task.completed ? "line-through" : "none"
            }}
          >
            {task.title}
          </span>

          <button 
            onClick={() => onDelete(task.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;