import type { Task } from "@/Model/Task";

export default function UncheckButton({
	onUncheck,
	task,
}: { onUncheck: (task: Task) => void; task: Task }) {
	return (
		<div>
			<button
				className="flex-none px-2"
				type="button"
				onClick={() => onUncheck(task)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className=" h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-label="Uncheck"
					role="img"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	);
}
