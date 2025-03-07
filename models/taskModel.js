const pool = require("../config/db");

// Create Task Table
const createTaskTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      category_id INT REFERENCES categories(id) ON DELETE SET NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

// Add a Task
const createTask = async (user_id, category_id, title, description) => {
  const result = await pool.query(
    "INSERT INTO tasks (user_id, category_id, title, description) VALUES ($1, $2, $3, $4) RETURNING *",
    [user_id, category_id, title, description]
  );
  return result.rows[0];
};

// Get All Tasks
const getAllTasks = async () => {
  const result = await pool.query("SELECT * FROM tasks");
  return result.rows;
};

// Get Tasks by Category
const getTasksByCategory = async (category_id) => {
  const result = await pool.query("SELECT * FROM tasks WHERE category_id = $1", [
    category_id,
  ]);
  return result.rows;
};

// Get Task by ID
const getTaskById = async (id) => {
  const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
  return result.rows[0];
};

// Update Task
const updateTask = async (id, title, description, completed) => {
  const result = await pool.query(
    "UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *",
    [title, description, completed, id]
  );
  return result.rows[0];
};

// Delete Task
const deleteTask = async (id) => {
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
};

// Initialize table on start
createTaskTable().catch(console.error);

module.exports = {
  createTask,
  getAllTasks,
  getTasksByCategory,
  getTaskById,
  updateTask,
  deleteTask,
};
