const express = require("express")
const router = express.Router()

const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getTasksByUserId
} = require("../controlller/user.controller")

router.post("/", registerUser)
router.post("/login", loginUser)
router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)
router.get("/:id/tasks", getTasksByUserId)

module.exports = router