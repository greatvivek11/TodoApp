import CheckButton from "@/Components/ButtonComponents/CheckButton";
import DeleteButton from "@/Components/ButtonComponents/DeleteButton";
import Editable from "@/Components/Editable";
import type { Task } from "@/Model/Task";
import { TaskStatus } from "@/Model/TaskStatus";
import { TasksState, updateTaskAtIndex } from "@/Recoil/recoilState";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";

export default function ActiveTask() {
	const [Tasks, setTasksState] = useRecoilState(TasksState);

	const onCheck = (task: Task) => {
		const index = Tasks.findIndex((t) => t === task);
		const newTask = { task: task.task, status: TaskStatus.Completed };
		setTasksState((oldTasks) => updateTaskAtIndex(oldTasks, newTask, index));
		toast.success("Task has been finished successfully", {
			style: { background: "green" },
		});
	};
	const onDelete = (task: Task) => {
		const index = Tasks.findIndex((t) => t === task);
		setTasksState((oldTasks) => oldTasks.filter((_, i) => i !== index));
		toast.error("Task has been removed!");
	};
	const inputRef = useRef<HTMLInputElement>();

	function pushTasks(e: React.KeyboardEvent<HTMLInputElement>, task: Task) {
		if (e.key === "Enter") {
			const newTask = {
				task: e.currentTarget.value,
				status: TaskStatus.Active,
			};
			const index = Tasks.findIndex((t) => t === task);
			setTasksState((oldTasks) => updateTaskAtIndex(oldTasks, newTask, index));
			toast.info("Task has been updated successfully.", {
				style: { background: "darkorange" },
			});
		}
	}

	return (
		<div className="container overflow-y:auto mx-auto mb-5">
			{Tasks?.filter((task) => task.status === TaskStatus.Active).map(
				(task) => (
					<div className="flex flex-wrap px-5 md:px-20" key={task.task}>
						<CheckButton onCheck={onCheck} task={task} />
						<Editable
							className="flex-grow w-2/3"
							text={task.task}
							placeholder="Write a task name"
							type="input"
							childRef={inputRef}
							handleKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
								pushTasks(e, task)
							}
						/>
						<DeleteButton onDelete={onDelete} task={task} />
					</div>
				),
			)}
		</div>
	);
}
