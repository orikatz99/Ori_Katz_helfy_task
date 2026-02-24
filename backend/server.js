const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
const tasksRoutes = require("./routes/tasks");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", tasksRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});