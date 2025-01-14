require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware for JSON body parsing

//  Connect to PostgreSQL on Render
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Important for Render-hosted databases
    },
  },
});

//  Define Task Model
const Task = sequelize.define("task", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  due_date: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

//  Sync Database (Only in Development)
sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Error syncing database:", err));

//  Test Database Connection
async function testDB() {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL Connected on Render!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}
testDB();

// API Routes

// Get all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Add a new task
app.post("/api/tasks", async (req, res) => {
  const { text, due_date } = req.body;

  try {
    const task = await Task.create({ text, due_date });
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add task" });
  }
});

// Delete a task
app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Task.destroy({ where: { id } });
    res.status(204).send(); // No Content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
