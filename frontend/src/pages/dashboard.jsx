import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import api from "../utils/api"
import Navbar from "../components/navbar"
import TaskCard from "../components/taskCard"

function Dashboard() {
	const location = useLocation()
	const navigate = useNavigate()
	const [tasks, setTasks] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState("")
	const [success, setSuccess] = useState(location.state?.success || "")

	const loadTasks = async () => {
		setError("")
		setIsLoading(true)

		try {
			const response = await api.get("/tasks/my-tasks")
			setTasks(response.data)
		} catch (requestError) {
			setError(requestError.response?.data?.message || "Failed to load tasks")
		} finally {
			setIsLoading(false)
		}
	}

	const handleDelete = async (taskId) => {
		setError("")
		setSuccess("")
		try {
			await api.delete(`/tasks/${taskId}`)
			setTasks((previous) => previous.filter((task) => task.id !== taskId))
			setSuccess("Task berhasil dihapus")
		} catch (requestError) {
			setError(requestError.response?.data?.message || "Failed to delete task")
		}
	}

	const handleChangeStatus = async (task, nextStatus) => {
		setError("")
		setSuccess("")

		try {
			const payload = {
				title: task.title,
				description: task.description || "",
				status: nextStatus
			}

			await api.put(`/tasks/${task.id}`, payload)
			setTasks((previous) =>
				previous.map((item) => (item.id === task.id ? { ...item, status: payload.status } : item))
			)
			setSuccess("Status task berhasil diperbarui")
		} catch (requestError) {
			setError(requestError.response?.data?.message || "Failed to update status")
		}
	}

	useEffect(() => {
		loadTasks()
	}, [])

	useEffect(() => {
		if (location.state?.success) {
			navigate(location.pathname, { replace: true, state: {} })
		}
	}, [location.pathname, location.state, navigate])

	return (
		<div className="min-h-screen bg-neutral-50">
			<Navbar />

			<main className="mx-auto max-w-4xl px-4 pb-8">
				<div className="mb-4 flex items-center justify-between">
					<h1 className="text-2xl font-bold text-neutral-900">My Tasks</h1>
					<button
						type="button"
						onClick={loadTasks}
						className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
					>
						Refresh
					</button>
				</div>

				{error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
				{success ? <p className="mb-4 rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">{success}</p> : null}

				{isLoading ? <p className="text-sm text-neutral-600">Loading tasks...</p> : null}

				{!isLoading && tasks.length === 0 ? (
					<p className="rounded-md border border-neutral-200 bg-white p-4 text-sm text-neutral-600">No tasks yet.</p>
				) : null}

				<div className="grid gap-4 sm:grid-cols-2">
					{tasks.map((task) => (
						<TaskCard key={task.id} task={task} onDelete={handleDelete} onChangeStatus={handleChangeStatus} />
					))}
				</div>
			</main>
		</div>
	)
}

export default Dashboard
