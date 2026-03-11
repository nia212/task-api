const express = require('express');
const app = express();
const cors = require("cors");
require("dotenv").config()
const db = require("./db")

app.use(cors())

const userRoutes = require("./src/routers/user.route")
const taskRoutes = require("./src/routers/task.route")

app.use(express.json())

app.use("/users", userRoutes)
app.use("/tasks", taskRoutes)

app.listen(3001, () => {
  console.log("Server running on port 3001")
})


