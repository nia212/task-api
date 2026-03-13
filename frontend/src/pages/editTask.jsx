import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../utils/api"
import Navbar from "../components/navbar"
import TaskForm from "../components/taskForm"

function EditTask() {
	const { id } = useParams()
	const navigate = useNavigate()

	const [initialValues, setInitialValues] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState("")

	useEffect(() => {
		const loadTask = async () => {
			setError("")
			setIsLoading(true)

			try {
				const response = await api.get(`/tasks/${id}`)
				setInitialValues({
					title: response.data.title,
					description: response.data.description || "",
					status: response.data.status || "pending"
				})
			} catch (requestError) {
				setError(requestError.response?.data?.message || "Failed to load task")
			} finally {
				setIsLoading(false)
			}
		}

		loadTask()
	}, [id])

	const handleUpdate = async (values) => {
		setError("")
		setIsSubmitting(true)

		try {
			await api.put(`/tasks/${id}`, values)
			navigate("/", { replace: true, state: { success: "Task berhasil diperbarui" } })
		} catch (requestError) {
			setError(requestError.response?.data?.message || "Failed to update task")
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="min-h-screen bg-neutral-50">
			<Navbar />

			<main className="mx-auto max-w-2xl px-4 pb-8">
				<h1 className="mb-4 text-2xl font-bold text-neutral-900">Edit Task</h1>

				{error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

				{isLoading ? <p className="text-sm text-neutral-600">Loading task...</p> : null}

				{!isLoading && initialValues ? (
					<TaskForm
						initialValues={initialValues}
						onSubmit={handleUpdate}
						submitLabel="Simpan"
						isSubmitting={isSubmitting}
						cancelTo="/"
					/>
				) : null}
			</main>
		</div>
	)
}

export default EditTask
