function TaskList({ tasks, onToggle }) {
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
        </li>
      ))}
    </ul>
  );
}

export default TaskList;