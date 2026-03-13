import { Routes, Route, Navigate } from "react-router-dom"

import Login from "../pages/login"
import Register from "../pages/register"
import Dashboard from "../pages/dashboard"
import CreateTask from "../pages/createTask"
import EditTask from "../pages/editTask"
import ProtectedRoute from "../components/protectedRoute"

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks/new" element={<CreateTask />} />
        <Route path="/tasks/:id/edit" element={<EditTask />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRouter