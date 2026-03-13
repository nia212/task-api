import baseURL from "./baseURL"
import { getToken } from "./token"

const buildHeaders = (headers = {}) => {
  const token = getToken()
  const nextHeaders = { ...headers }

  if (token) {
    nextHeaders.Authorization = `Bearer ${token}`
  }

  return nextHeaders
}

const request = async (method, path, body) => {
  const headers = buildHeaders({
    "Content-Type": "application/json"
  })

  const response = await fetch(`${baseURL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  })

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(payload.message || "Request failed")
    error.response = { data: payload, status: response.status }
    throw error
  }

  return { data: payload, status: response.status }
}

const api = {
  get: (path) => request("GET", path),
  post: (path, body) => request("POST", path, body),
  put: (path, body) => request("PUT", path, body),
  delete: (path) => request("DELETE", path)
}

export default api