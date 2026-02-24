import { useState } from "react";

function TaskList({ tasks, onToggle, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    priority: "medium"
  });

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} style={{ marginBottom: "15px" }}>
          {editingId === task.id ? (
            <>
              <input
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
              />

              <input
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
              />

              <select
                value={editData.priority}
                onChange={(e) =>
                  setEditData({ ...editData, priority: e.target.value })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <button
                onClick={() => {
                  onUpdate(task.id, editData);
                  setEditingId(null);
                }}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <span
                onClick={() => onToggle(task.id)}
                style={{
                  cursor: "pointer",
                  textDecoration: task.completed ? "line-through" : "none"
                }}
              >
                {task.title}
              </span>

              <span style={{ marginLeft: "10px", fontSize: "12px" }}>
                ({task.priority})
              </span>

              <button
                onClick={() => {
                  setEditingId(task.id);
                  setEditData({
                    title: task.title,
                    description: task.description || "",
                    priority: task.priority || "medium"
                  });
                }}
                style={{ marginLeft: "10px" }}
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(task.id)}
                style={{ marginLeft: "5px" }}
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;