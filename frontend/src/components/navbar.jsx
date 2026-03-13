import { Link, useNavigate } from "react-router-dom"
import { removeToken } from "../utils/token"

function Navbar() {
	const navigate = useNavigate()

	const handleLogout = () => {
		removeToken()
		navigate("/login", { replace: true })
	}

	return (
		<header className="mb-6 border-b border-neutral-200 bg-white">
			<div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
				<Link to="/" className="text-xl font-bold text-neutral-900">
					Task Manager
				</Link>

				<nav className="flex items-center gap-3">
					<Link
						to="/"
						className="rounded-md px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
					>
						Dashboard
					</Link>
					<Link
						to="/tasks/new"
						className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-800"
					>
						New Task
					</Link>
					<button
						type="button"
						onClick={handleLogout}
						className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
					>
						Logout
					</button>
				</nav>
			</div>
		</header>
	)
}

export default Navbar
