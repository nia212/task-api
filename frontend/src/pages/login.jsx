import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import api from "../utils/api"
import { setToken } from "../utils/token"

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const redirectPath = location.state?.from?.pathname || "/"
  const successMessage = location.state?.success || ""

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const response = await api.post("/users/login", { email, password })
      setToken(response.data.token)
      navigate(redirectPath, { replace: true, state: { success: "Login berhasil" } })
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Login failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-neutral-900">Welcome back</h1>
        <p className="mb-6 text-sm text-neutral-600">Log in to access your tasks.</p>

        {successMessage ? <p className="mb-4 rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">{successMessage}</p> : null}
        {error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-neutral-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-neutral-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-neutral-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-medium text-neutral-900 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
