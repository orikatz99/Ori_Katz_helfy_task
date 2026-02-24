import { useState } from "react";

function TaskList({ tasks, onToggle, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    priority: "medium"
  });

  function getPriorityColor(priority) {
    if (priority === "high") return "#ff4d4f";
    if (priority === "medium") return "#faad14";
    return "#52c41a";
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map(task => (
        <li
          key={task.id}
          style={{
            marginBottom: "15px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "6px"
          }}
        >
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
                style={{ marginLeft: "5px" }}
              />

              <select
                value={editData.priority}
                onChange={(e) =>
                  setEditData({ ...editData, priority: e.target.value })
                }
                style={{ marginLeft: "5px" }}
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
                style={{ marginLeft: "5px" }}
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
                  textDecoration: task.completed ? "line-through" : "none",
                  fontWeight: "500"
                }}
              >
                {task.title}
              </span>

              {task.description && (
                <div style={{ fontSize: "13px", marginTop: "3px" }}>
                  {task.description}
                </div>
              )}

              <span
                style={{
                  display: "inline-block",
                  marginTop: "5px",
                  padding: "2px 8px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  backgroundColor: getPriorityColor(task.priority),
                  color: "white"
                }}
              >
                {task.priority}
              </span>

              <div style={{ marginTop: "8px" }}>
                <button
                  onClick={() => {
                    setEditingId(task.id);
                    setEditData({
                      title: task.title,
                      description: task.description || "",
                      priority: task.priority || "medium"
                    });
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(task.id)}
                  style={{ marginLeft: "5px" }}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;