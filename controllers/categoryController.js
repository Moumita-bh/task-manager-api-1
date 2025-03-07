const pool = require("../config/db");

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query("INSERT INTO categories (name) VALUES ($1) RETURNING *", [name]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getCategories = async (req, res) => {
  const result = await pool.query("SELECT * FROM categories");
  res.json(result.rows);
};

module.exports = { createCategory, getCategories };
