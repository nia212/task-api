const db = require("../../db")
const bcrypt = require("bcrypt")
const generateToken = require("../utils/generateToken")

exports.registerUser = async (req, res) => {

  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email, and password are required"
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" })
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters"
    })
  }


  try {

    const hashed = await bcrypt.hash(password, 10)

    const [result] = await db.query(
      "INSERT INTO users (name,email,password)  VALUES (?,?,?)",
      [name, email, hashed]
    )

    res.json({
      message: "User created",
      id: result.insertId
    })

  } catch (error) {

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Email already in use" })
    }
    res.status(500).json({ message: error.message })

  }
}

exports.loginUser = async (req, res) => {

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    })
  }


  try {

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    )

    const user = rows[0]

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = generateToken(user.id)

    res.json({ token })

  } catch (error) {

    res.status(500).json({ message: error.message })

  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name, email FROM users")
    res.json(rows)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const [rows] = await db.query(
      "SELECT id, name, email FROM users WHERE id=?",
      [id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateUser = async (req, res) => {
  const { id } = req.params
  const { name, email } = req.body

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" })
  }

  try {
    const [result] = await db.query(
      "UPDATE users SET name=?, email=? WHERE id=?",
      [name, email, id]
    )
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json({ message: "User updated" })
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Email already in use" })
    }
    res.status(500).json({ message: error.message })
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const [result] = await db.query("DELETE FROM users WHERE id=?", [id])
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json({ message: "User deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getTasksByUserId = async (req, res) => {
  const { id } = req.params
  try {
    const [rows] = await db.query(
      "SELECT * FROM task WHERE user_id=?",
      [id]
    )
    res.json(rows)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}