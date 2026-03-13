import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../utils/api"
import Navbar from "../components/navbar"
import TaskForm from "../components/taskForm"

function CreateTask() {
	const navigate = useNavigate()
	const [error, setError] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleCreate = async (values) => {
		setError("")
		setIsSubmitting(true)

		try {
			await api.post("/tasks", values)
			navigate("/", { replace: true, state: { success: "Task berhasil dibuat" } })
		} catch (requestError) {
			setError(requestError.response?.data?.message || "Failed to create task")
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="min-h-screen bg-neutral-50">
			<Navbar />

			<main className="mx-auto max-w-2xl px-4 pb-8">
				<h1 className="mb-4 text-2xl font-bold text-neutral-900">Create Task</h1>

				{error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

				<TaskForm onSubmit={handleCreate} submitLabel="Simpan" isSubmitting={isSubmitting} cancelTo="/" />
			</main>
		</div>
	)
}

export default CreateTask
