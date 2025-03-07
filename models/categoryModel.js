const pool = require("../config/db");

// Create Category Table
const createCategoryTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) UNIQUE NOT NULL
    );
  `;
  await pool.query(query);
};

// Create Category
const createCategory = async (name) => {
  const result = await pool.query(
    "INSERT INTO categories (name) VALUES ($1) RETURNING *",
    [name]
  );
  return result.rows[0];
};

// Get All Categories
const getAllCategories = async () => {
  const result = await pool.query("SELECT * FROM categories");
  return result.rows;
};

// Initialize table on start
createCategoryTable().catch(console.error);

module.exports = { createCategory, getAllCategories };
