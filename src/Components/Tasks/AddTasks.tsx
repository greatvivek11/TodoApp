import { TaskStatus } from "@/Model/TaskStatus";
import { TasksState } from "@/Recoil/recoilState";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";

export default function AddTasks() {
	const [inputValue, setInputValue] = useState("");
	const setTasksState = useSetRecoilState(TasksState);

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		(e.target as HTMLFormElement).reset();
		setTasksState((oldState) => [
			...oldState,
			{ task: inputValue, status: TaskStatus.Active },
		]);
		toast.success("Task has been added successfully!");
		setInputValue("");
	}

	function addInputChange(task: string) {
		setInputValue(task);
	}

	return (
		<div className="container mx-auto mt-2">
			<form className="my-4" autoComplete="off" onSubmit={onSubmit}>
				<input
					required
					minLength={1}
					maxLength={100}
					type="text"
					name="addTask"
					className="mx-2 rounded-full text-black text-center border border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
					id="addTask"
					placeholder="Add a task"
					onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
						addInputChange(e.target.value)
					}
				/>
				<button
					className="border border-red-800 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 mx-2 mt-4 rounded-lg px-4"
					type="submit"
				>
					Add Task
				</button>
			</form>
		</div>
	);
}
