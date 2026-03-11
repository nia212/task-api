const db = require("../../db")

exports.createTask = async (req, res) => {

  const { title } = req.body
  const userId = req.user.id

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" })
  }

  const validStatuses = ["pending", "in-progress", "done"]
  if (req.body.status && !validStatuses.includes(req.body.status)) {
    return res.status(400).json({ message: "Status must be pending, in-progress, or done" })
  }

  try {

    const [result] = await db.query(
      "INSERT INTO task (title,user_id, description, status) VALUES (?,?,?,?)",
      [title.trim(), userId, req.body.description || null, req.body.status || "pending"]
    )

    res.json({
      message: "Task created",
      id: result.insertId
    })

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}

exports.getMyTasks = async (req, res) => {

  const userId = req.user.id

  try {

    const [rows] = await db.query(
      "SELECT * FROM task WHERE user_id=?",
      [userId]
    )

    res.json(rows)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}

exports.getAllTasks = async (req, res) => {

  try {

    const [rows] = await db.query("SELECT * FROM task")

    res.json(rows)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}

exports.getTaskById = async (req, res) => {

  const { id } = req.params

  try {

    const [rows] = await db.query(
      "SELECT * FROM task WHERE id=?",
      [id]
    )

    if (rows.length === 0) {
      return res.status(404).json({ message: "Task not found" })
    }

    res.json(rows[0])

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}

exports.updateTask = async (req, res) => {

  const { id } = req.params
  const userId = req.user.id
  const { title, description, status } = req.body

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" })
  }

  const validStatuses = ["pending", "in-progress", "done"]
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ message: "Status must be pending, in-progress, or done" })
  }

  try {

    const [result] = await db.query(
      "UPDATE task SET title=?, description=?, status=? WHERE id=? AND user_id=?",
      [title.trim(), description, status, id, userId]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found or not authorized" })
    }

    res.json({ message: "Task updated" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteTask = async (req, res) => {

  const { id } = req.params
  const userId = req.user.id

  try {

    const [result] = await db.query(
      "DELETE FROM task WHERE id=? AND user_id=?",
      [id, userId]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found or not authorized" })
    }

    res.json({ message: "Task deleted" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}