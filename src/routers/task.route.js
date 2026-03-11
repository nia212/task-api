const express = require("express")
const router = express.Router()

const protect = require("../middleware/auth.middleware")

const {
  createTask,
  getAllTasks,
  getMyTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require("../controlller/task.controller")

router.post("/", protect, createTask)
router.get("/", getAllTasks)
router.get("/my-tasks", protect, getMyTasks)
router.get("/:id", getTaskById)
router.put("/:id", protect, updateTask)
router.delete("/:id", protect, deleteTask)


module.exports = router