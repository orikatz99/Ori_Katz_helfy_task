import { useEffect, useMemo, useRef, useState } from "react";

function TaskList({ tasks, onToggle, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    priority: "medium",
  });

  const viewportRef = useRef(null);
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
    if (!trackRef.current || !tasks || tasks.length === 0) return;

    const t = setTimeout(() => {
      const trackEl = trackRef.current;

      const total = trackEl.scrollWidth;
      loopWidthRef.current = total / 2;

      offsetRef.current = 0;
      trackEl.style.transform = `translateX(0px)`;
    }, 0);

    return () => clearTimeout(t);
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

      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000; // seconds
      lastTsRef.current = ts;

      const speed = 60; 
      offsetRef.current -= speed * dt;

      const loopWidth = loopWidthRef.current || 0;
      if (loopWidth > 0 && Math.abs(offsetRef.current) >= loopWidth) {
        offsetRef.current += loopWidth;
      }

      trackEl.style.transform = `translateX(${offsetRef.current}px)`;
      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!tasks || tasks.length === 0) {
    return <div style={{ padding: "10px" }}>No tasks yet.</div>;
  }

  return (
    <div
      ref={viewportRef}
      style={{
        overflow: "hidden",
        width: "100%",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
      }}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "16px",
          willChange: "transform",
        }}
      >
        {loopItems.map((task, idx) => (
          <div
            key={`${task.id}-${idx}`} // use index in key to differentiate duplicates
            style={{
              minWidth: "280px",
              maxWidth: "280px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px",
              background: "#111",
              flex: "0 0 auto",
            }}
          >
            {editingId === task.id ? (
              <>
                <input
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  style={{ width: "100%", marginBottom: "6px" }}
                />

                <input
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  style={{ width: "100%", marginBottom: "6px" }}
                />

                <select
                  value={editData.priority}
                  onChange={(e) =>
                    setEditData({ ...editData, priority: e.target.value })
                  }
                  style={{ width: "100%", marginBottom: "6px" }}
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
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                    onClick={() => onToggle(task.id)}
                    style={{
                        cursor: "pointer",
                        textDecoration: task.completed ? "line-through" : "none",
                        fontWeight: 700,
                        fontSize: "16px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                }}
                title={task.title}
            >
                {task.title}
                </div>

                <div
                style={{
                    marginTop: "6px",
                    fontSize: "13px",
                    opacity: 0.85,
                    height: "34px",
                    overflow: "hidden"
                }}
                >
                {task.description ? task.description : <span style={{ opacity: 0.5 }}>No description</span>}
                </div>
            </div>

        <span
            style={{
            padding: "2px 8px",
            borderRadius: "10px",
            fontSize: "12px",
            backgroundColor: getPriorityColor(task.priority),
            color: "white",
            whiteSpace: "nowrap",
            flexShrink: 0
            }}
        >
        {task.priority}
        </span>
    </div>
                <div style={{ marginTop: "10px", display: "flex", gap: "6px" }}>
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