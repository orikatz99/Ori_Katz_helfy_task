function TaskFilter({ currentFilter, onChange }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <button onClick={() => onChange("all")}>All</button>
      <button onClick={() => onChange("completed")} style={{ marginLeft: "5px" }}>
        Completed
      </button>
      <button onClick={() => onChange("pending")} style={{ marginLeft: "5px" }}>
        Pending
      </button>
    </div>
  );
}

export default TaskFilter;