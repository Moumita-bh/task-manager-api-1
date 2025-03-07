const pool = require("../config/db");

const createTask = async (req, res) => {
  const { title, description, category_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, description, category_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, category_id, req.userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getTasks = async (req, res) => {
  const categoryId = req.query.category_id;
  const query = categoryId ? "SELECT * FROM tasks WHERE category_id = $1" : "SELECT * FROM tasks";
  const result = await pool.query(query, categoryId ? [categoryId] : []);
  res.json(result.rows);
};

const getTaskById = async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [req.params.id]);
  res.json(result.rows[0]);
};

module.exports = { createTask, getTasks, getTaskById };
