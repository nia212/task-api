import { Link } from "react-router-dom"

const statusStyles = {
	pending: "bg-amber-100 text-amber-800",
	"in-progress": "bg-sky-100 text-sky-800",
	done: "bg-emerald-100 text-emerald-800"
}

function TaskCard({ task, onDelete, onChangeStatus }) {
	const statusClass = statusStyles[task.status] || "bg-neutral-100 text-neutral-700"

	const handleDelete = () => {
		const confirmed = window.confirm("Yakin ingin menghapus task ini?")
		if (confirmed) {
			onDelete(task.id)
		}
	}

	return (
		<article className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
			<div className="mb-3 flex items-start justify-between gap-3">
				<h3 className="text-lg font-semibold text-neutral-900">{task.title}</h3>
				<span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass}`}>
					{task.status}
				</span>
			</div>

			<p className="mb-4 min-h-10 text-sm text-neutral-600">{task.description || "No description"}</p>

			<div className="mb-4">
				<label htmlFor={`status-${task.id}`} className="mb-1 block text-sm font-medium text-neutral-700">
					Ubah status
				</label>
				<select
					id={`status-${task.id}`}
					value={task.status}
					onChange={(event) => onChangeStatus(task, event.target.value)}
					className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
				>
					<option value="pending">pending</option>
					<option value="in-progress">in-progress</option>
					<option value="done">done</option>
				</select>
			</div>

			<div className="flex items-center gap-2">
				<Link
					to={`/tasks/${task.id}/edit`}
					className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
				>
					Edit
				</Link>
				<button
					type="button"
					onClick={handleDelete}
					className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
				>
					Delete
				</button>
			</div>
		</article>
	)
}

export default TaskCard
