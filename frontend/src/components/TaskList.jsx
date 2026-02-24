import { useEffect, useMemo, useRef, useState } from "react";

function TaskList({ tasks, onToggle, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    priority: "medium",
  });

  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);
  const pausedRef = useRef(false);

  const loopItems = useMemo(() => {
    if (!tasks || tasks.length === 0) return [];
    return [...tasks, ...tasks];
  }, [tasks]);

  function getPriorityColor(priority) {
    if (priority === "high") return "#ff4d4f";
    if (priority === "medium") return "#faad14";
    return "#52c41a";
  }

  useEffect(() => {
    if (!trackRef.current || tasks.length === 0) return;

    const total = trackRef.current.scrollWidth;
    loopWidthRef.current = total / 2;

    offsetRef.current = 0;
    trackRef.current.style.transform = `translateX(0px)`;
  }, [tasks]);

  useEffect(() => {
    const trackEl = trackRef.current;
    if (!trackEl) return;

    function step(ts) {
      if (pausedRef.current) {
        lastTsRef.current = ts;
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      const speed = 60;
      offsetRef.current -= speed * dt;

      const loopWidth = loopWidthRef.current;
      if (Math.abs(offsetRef.current) >= loopWidth) {
        offsetRef.current += loopWidth;
      }

      trackEl.style.transform = `translateX(${offsetRef.current}px)`;
      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  if (!tasks || tasks.length === 0) {
    return <div style={{ textAlign: "center" }}>No tasks yet.</div>;
  }

  return (
    <div
      className="carousel-wrapper"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="carousel-track" ref={trackRef}>
        {loopItems.map((task, idx) => (
          <div key={`${task.id}-${idx}`} className="task-card">

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
                <div className="task-header">
                  <div
                    className={`task-title ${
                      task.completed ? "completed" : ""
                    }`}
                    onClick={() => onToggle(task.id)}
                  >
                    {task.title}
                  </div>

                  <span
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                  >
                    {task.priority}
                  </span>
                </div>

                <div className="task-description">
                  {task.description || "No description"}
                </div>

                <div className="task-actions">
                  <button
                    onClick={() => {
                      setEditingId(task.id);
                      setEditData({
                        title: task.title,
                        description: task.description || "",
                        priority: task.priority || "medium",
                      });
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      const ok = window.confirm("Delete this task?");
                      if (ok) onDelete(task.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;