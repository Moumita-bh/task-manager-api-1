const express = require("express");
const { createCategory, getCategories } = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/categories", authMiddleware, createCategory);
router.get("/categories", getCategories);

module.exports = router;
