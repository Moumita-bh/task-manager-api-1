const express = require("express");
const { createTask, getTasks, getTaskById } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/tasks", authMiddleware, createTask);
router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskById);

module.exports = router;
