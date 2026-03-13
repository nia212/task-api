import { useState } from "react"
import { Link } from "react-router-dom"

function TaskForm({
	initialValues,
	onSubmit,
	submitLabel = "Simpan",
	isSubmitting = false,
	cancelTo = "/"
}) {
	const [title, setTitle] = useState(initialValues?.title || "")
	const [description, setDescription] = useState(initialValues?.description || "")
	const [status, setStatus] = useState(initialValues?.status || "pending")

	const handleSubmit = (event) => {
		event.preventDefault()
		onSubmit({
			title,
			description,
			status
		})
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
			<div>
				<label htmlFor="title" className="mb-1 block text-sm font-medium text-neutral-700">
					Title
				</label>
				<input
					id="title"
					type="text"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
					required
					className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
				/>
			</div>

			<div>
				<label htmlFor="description" className="mb-1 block text-sm font-medium text-neutral-700">
					Description
				</label>
				<textarea
					id="description"
					rows={4}
					value={description}
					onChange={(event) => setDescription(event.target.value)}
					className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
				/>
			</div>

			<div>
				<label htmlFor="status" className="mb-1 block text-sm font-medium text-neutral-700">
					Status
				</label>
				<select
					id="status"
					value={status}
					onChange={(event) => setStatus(event.target.value)}
					className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
				>
					<option value="pending">pending</option>
					<option value="in-progress">in-progress</option>
					<option value="done">done</option>
				</select>
			</div>

			<div className="flex items-center gap-2">
				<button
					type="submit"
					disabled={isSubmitting}
					className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
				>
					{isSubmitting ? "Menyimpan..." : submitLabel}
				</button>
				<Link
					to={cancelTo}
					className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
				>
					Batal
				</Link>
			</div>
		</form>
	)
}

export default TaskForm
